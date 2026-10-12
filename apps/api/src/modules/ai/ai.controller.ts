import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { AIService } from './ai.service';
import { AIResponseValidator, PromptLogger } from '../../common/guardrails.middleware';

@Controller('api/ai')
export class AIController {
  constructor(
    private readonly aiService: AIService,
    private readonly validator: AIResponseValidator,
    private readonly logger: PromptLogger,
  ) {}

  @Post('booking-assistant')
  async bookingAssistant(
    @Body() body: any,
    @Headers('x-prompt-id') promptId: string = 'booking-assistant',
    @Headers('x-prompt-version') promptVersion: string = '1.0.0',
  ) {
    const executionId = this.logger.generateExecutionId();
    const startTime = Date.now();

    try {
      // Process the AI request
      const response = await this.aiService.processBookingAssistant(body);

      // Apply guardrails
      const validatedResponse = this.validator.validateResponse(promptId, response);
      const safeResponse = this.validator.applySafetyGuardrails(validatedResponse);

      // Log execution
      const executionTime = Date.now() - startTime;
      await this.logger.logExecution({
        promptId,
        promptVersion,
        executionId,
        inputParameters: body,
        groundedContextRetrieved: response.grounded_context_retrieved || [],
        rawCompletionOutput: response.raw_completion_output || '',
        citationSources: response.citation_sources || [],
        response: safeResponse,
        executionTimeMs: executionTime,
        modelUsed: 'gpt-4', // TODO: Make this configurable
        tokensUsed: {
          prompt: 0, // TODO: Track actual token usage
          completion: 0,
          total: 0,
        },
      });

      return safeResponse;
    } catch (error) {
      throw error;
    }
  }

  @Post('policy-lookup')
  async policyLookup(
    @Body() body: any,
    @Headers('x-prompt-id') promptId: string = 'policy-lookup',
    @Headers('x-prompt-version') promptVersion: string = '1.0.0',
  ) {
    const executionId = this.logger.generateExecutionId();
    const startTime = Date.now();

    try {
      const response = await this.aiService.processPolicyLookup(body);
      const validatedResponse = this.validator.validateResponse(promptId, response);
      const safeResponse = this.validator.applySafetyGuardrails(validatedResponse);

      const executionTime = Date.now() - startTime;
      await this.logger.logExecution({
        promptId,
        promptVersion,
        executionId,
        inputParameters: body,
        groundedContextRetrieved: response.grounded_context_retrieved || [],
        rawCompletionOutput: response.raw_completion_output || '',
        citationSources: response.citation_sources || [],
        response: safeResponse,
        executionTimeMs: executionTime,
        modelUsed: 'gpt-4',
        tokensUsed: { prompt: 0, completion: 0, total: 0 },
      });

      return safeResponse;
    } catch (error) {
      throw error;
    }
  }

  @Post('billing-mapper')
  async billingMapper(
    @Body() body: any,
    @Headers('x-prompt-id') promptId: string = 'billing-mapper',
    @Headers('x-prompt-version') promptVersion: string = '1.0.0',
  ) {
    const executionId = this.logger.generateExecutionId();
    const startTime = Date.now();

    try {
      const response = await this.aiService.processBillingMapper(body);
      const validatedResponse = this.validator.validateResponse(promptId, response);
      const safeResponse = this.validator.applySafetyGuardrails(validatedResponse);

      const executionTime = Date.now() - startTime;
      await this.logger.logExecution({
        promptId,
        promptVersion,
        executionId,
        inputParameters: body,
        groundedContextRetrieved: response.grounded_context_retrieved || [],
        rawCompletionOutput: response.raw_completion_output || '',
        citationSources: response.citation_sources || [],
        response: safeResponse,
        executionTimeMs: executionTime,
        modelUsed: 'gpt-4',
        tokensUsed: { prompt: 0, completion: 0, total: 0 },
      });

      return safeResponse;
    } catch (error) {
      throw error;
    }
  }
}