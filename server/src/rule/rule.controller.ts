import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { AuthGuard } from '../auth/guard';
import { GetHouse } from '../auth/decorator';

@UseGuards(AuthGuard)
@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  getRules(@GetHouse('id') houseId: number) {
    return this.ruleService.getRules(houseId);
  }

  @Get(':id')
  getOneRule(@Param('id', ParseIntPipe) id: number) {
    return this.ruleService.getOneRule(id);
  }

  @Post()
  createRule(
    @GetHouse('id') houseId: number,
    @Body(new ValidationPipe()) createRuleDto: CreateRuleDto,
  ) {
    return this.ruleService.createRule(houseId, createRuleDto);
  }

  @Patch(':id')
  updateRule(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRuleDto: UpdateRuleDto,
  ) {
    return this.ruleService.updateRule(id, updateRuleDto);
  }

  @Delete(':id')
  removeRule(@Param('id', ParseIntPipe) id: number) {
    return this.ruleService.removeRule(id);
  }
}
