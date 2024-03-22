import { Module } from '@nestjs/common';
import { UserHouseController } from './user-house.controller';
import { UserHouseService } from './user-house.service';

@Module({
  controllers: [UserHouseController],
  providers: [UserHouseService],
})
export class UserHouseModule {}
