import {
  Controller,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { AuthGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { CreateHouseDto, UpdateHouseDto } from './dto';

@UseGuards(AuthGuard)
@Controller('houses')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  createHouse(@GetUser('id') userId: number, @Body() dto: CreateHouseDto) {
    return this.houseService.createHouse(userId, dto);
  }

  @Put(':houseId')
  updateHouse(
    @GetUser('id') userId: number,
    @Param('houseId', ParseIntPipe) houseId: number,
    @Body() dto: UpdateHouseDto,
  ) {
    return this.houseService.updateHouse(userId, houseId, dto);
  }

  @Get(':houseId')
  getHouse(
    @GetUser('id') userId: number,
    @Param('houseId', ParseIntPipe) houseId: number,
  ) {
    return this.houseService.getHouse(userId, houseId);
  }

  @Get(':houseId/todos')
  getTodos(
    @GetUser('id') userId: number,
    @Param('houseId', ParseIntPipe) houseId: number,
  ) {
    return this.houseService.getTodos(userId, houseId);
  }
}
