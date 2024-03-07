import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { AuthGuard } from '../auth/guard';

@UseGuards(AuthGuard)
@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get(':id')
  getHouse(@Param('id', ParseIntPipe) houseId: number) {
    return this.houseService.getHouse(houseId);
  }
}
