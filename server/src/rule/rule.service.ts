import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RuleService {
  constructor(private prisma: PrismaService) {}

  async getRules(houseId: number) {
    const house = await this.prisma.house.findUnique({
      where: { id: houseId },
    });

    if (!house) {
      throw new NotFoundException(`House with ID ${houseId} not found.`);
    }
    return house;
  }

  async getOneRule(id: number) {
    const rule = await this.prisma.rule.findUnique({
      where: { id },
    });

    if (!rule) {
      throw new NotFoundException(`Rule with ID ${id} not found.`);
    }
    return rule;
  }

  async createRule(houseId: number, dto: CreateRuleDto) {
    const newRule = await this.prisma.rule.create({
      data: {
        houseId,
        ...dto,
      },
    });

    return newRule;
  }

  async updateRule(id: number, dto: UpdateRuleDto) {
    // get the rule by id
    const rule = await this.prisma.rule.findUnique({
      where: {
        id,
      },
    });

    // check if there is the rule
    if (!rule || rule.id !== id)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.rule.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async removeRule(id: number) {
    const rule = await this.prisma.rule.findUnique({
      where: {
        id,
      },
    });

    // check if there is the rule
    if (!rule || rule.id !== id)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.rule.delete({
      where: {
        id,
      },
    });
  }
}
