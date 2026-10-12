import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { 
  validateBookingAssistantResponse, 
  validatePolicyLookupResponse, 
  validateBillingCodeMapperResponse,
  containsMedicalAdvice,
  requiresCitation
} from '@nemt/ai-guardrails';

export interface AIGuardrailsRequest extends Request {
  aiContext?: {
    promptId: string;
    promptVersion: string;
    inputParameters: Record<string, any>;
  };
}

@Injectable()
export class AIGuardrailsMiddleware implements NestMiddleware {
  use(req: AIGuardrailsRequest, res: Response, next: NextFunction) {
    // Skip guardrails for non-AI endpoints
    if (!req.path.startsWith('/api/ai/')) {
      return next();
    }

    // Extract AI context from headers or body
    const promptId = req.headers['x-prompt-id'] as string || req.body?.prompt_id;
    const promptVersion = req.headers['x-prompt-version'] as string || req.body?.prompt_version;

    if (!promptId || !promptVersion) {
      throw new BadRequestException('Missing required AI context: prompt_id and prompt_version are required');
    }

    // Store AI context for later use
    req.aiContext = {
      promptId,
      promptVersion,
      inputParameters: req.body || {},
    };

    next();
  }
}

@Injectable()
export class AIResponseValidator {
  /**
   * Validate AI response based on prompt type
   */
  validateResponse(promptId: string, response: any): any {
    try {
      switch (promptId) {
        case 'booking-assistant':
          return validateBookingAssistantResponse(response);
        case 'policy-lookup':
          return validatePolicyLookupResponse(response);
        case 'billing-mapper':
          return validateBillingCodeMapperResponse(response);
        default:
          // For unknown prompt types, perform basic validation
          return this.validateGenericResponse(response);
      }
    } catch (error) {
      throw new BadRequestException(`AI response validation failed: ${error.message}`);
    }
  }

  /**
   * Check if response contains medical advice
   */
  checkForMedicalAdvice(text: string): boolean {
    return containsMedicalAdvice(text);
  }

  /**
   * Check if response requires citations
   */
  checkCitationRequirements(text: string): boolean {
    return requiresCitation(text);
  }

  /**
   * Validate that citations are present when required
   */
  validateCitations(response: any, text: string): boolean {
    if (this.checkCitationRequirements(text)) {
      if (!response.citation_sources || response.citation_sources.length === 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Generic validation for unknown prompt types
   */
  private validateGenericResponse(response: any): any {
    if (!response) {
      throw new Error('Response is empty');
    }

    if (!response.prompt_id || !response.prompt_version) {
      throw new Error('Missing prompt metadata');
    }

    if (!response.response || typeof response.response !== 'object') {
      throw new Error('Invalid response structure');
    }

    return response;
  }

  /**
   * Apply safety guardrails to response
   */
  applySafetyGuardrails(response: any): any {
    const text = response.response?.content || response.raw_completion_output || '';

    // Check for medical advice
    if (this.checkForMedicalAdvice(text)) {
      throw new BadRequestException('Response contains medical advice, which is not permitted');
    }

    // Check citation requirements
    if (!this.validateCitations(response, text)) {
      response.response.requires_human_review = true;
      response.response.confidence = 0.5;
    }

    // Ensure data_unavailable flag is set when appropriate
    if (text.toLowerCase().includes('information unavailable') || 
        text.toLowerCase().includes('i don\'t have') ||
        text.toLowerCase().includes('cannot provide')) {
      response.response.data_unavailable = true;
    }

    return response;
  }
}

@Injectable()
export class PromptLogger {
  /**
   * Log prompt execution for audit trail
   */
  async logExecution(logData: {
    promptId: string;
    promptVersion: string;
    executionId: string;
    inputParameters: Record<string, any>;
    groundedContextRetrieved: string[];
    rawCompletionOutput: string;
    citationSources: any[];
    response: any;
    executionTimeMs: number;
    modelUsed: string;
    tokensUsed: {
      prompt: number;
      completion: number;
      total: number;
    };
  }): Promise<void> {
    // In production, this would log to a database or file system
    // For now, we'll log to console with structured format
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...logData,
    };

    console.log('[PROMPT_EXECUTION]', JSON.stringify(logEntry, null, 2));

    // TODO: Implement persistent logging to database
    // await this.promptLogRepository.create(logEntry);
  }

  /**
   * Generate execution ID
   */
  generateExecutionId(): string {
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}