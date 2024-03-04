import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';

@Module({
  controllers: [RuleController],
  providers: [RuleService],
})
export class RuleModule {}
