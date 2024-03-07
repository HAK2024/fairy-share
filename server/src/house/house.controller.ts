import {
  Controller,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { AuthGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(AuthGuard)
@Controller('houses')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get(':houseId')
  getHouse(@Param('houseId', ParseIntPipe) houseId: number) {
    return this.houseService.getHouse(houseId);
  }

  @Get(':houseId/todos')
  getTodos(
    @GetUser('id') userId: number,
    @Param('houseId', ParseIntPipe) houseId: number,
  ) {
    return this.houseService.getTodos(userId, houseId);
  }
}
