import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserHouseDto, UpdateAdminDto } from './dto';

@Injectable()
export class UserHouseService {
  constructor(private prisma: PrismaService) {}

  async addUserToHouse(userId: number, dto: CreateUserHouseDto) {
    try {
      const userHouse = await this.prisma.userHouse.findFirst({
        where: {
          userId,
        },
      });

      if (userHouse) {
        throw new ConflictException('User already has a house.');
      }

      const houseId = Number(dto.houseId);
      const createdUserHouse = await this.prisma.userHouse.create({
        data: {
          userId,
          houseId,
          isAdmin: false,
        },
      });

      return { createdUserHouse };
    } catch (error) {
      console.error('Error adding user to house:', error);
      throw error;
    }
  }

  async updateAdminStatus(
    userId: number,
    { houseId, isAdmin }: UpdateAdminDto,
  ) {
    // Check if user is admin or not
    const requestingUserAdminStatus = await this.prisma.userHouse.findUnique({
      where: {
        userId_houseId: {
          userId: userId,
          houseId: houseId,
        },
      },
      select: {
        isAdmin: true,
      },
    });

    if (!requestingUserAdminStatus || !requestingUserAdminStatus.isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    // Check if user is not the only admin or not
    const adminCount = await this.prisma.userHouse.count({
      where: {
        houseId,
        isAdmin: true,
      },
    });

    if (!isAdmin && adminCount <= 1) {
      throw new BadRequestException('At least one admin is required');
    }

    const updatedAdminStatus = await this.prisma.userHouse.update({
      where: {
        userId_houseId: {
          userId: userId,
          houseId: houseId,
        },
      },
      data: {
        isAdmin: isAdmin,
      },
      select: {
        isAdmin: true,
      },
    });

    return updatedAdminStatus;
  }
}
