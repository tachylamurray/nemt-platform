import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';
import { AIResponseValidator, PromptLogger } from '../common/guardrails.middleware';

@Module({
  controllers: [AIController],
  providers: [AIService, AIResponseValidator, PromptLogger],
  exports: [AIService, AIResponseValidator, PromptLogger],
})
export class AIModule {}
