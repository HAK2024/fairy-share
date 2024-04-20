import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserHouseDto, DeleteUserHouseDto, UpdateAdminDto } from './dto';

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
    { userId: targetUserId, houseId, isAdmin }: UpdateAdminDto,
  ) {
    try {
      const operatingUserHouse = await this.prisma.userHouse.findUnique({
        where: {
          userId_houseId: {
            userId,
            houseId,
          },
        },
      });

      if (!operatingUserHouse) {
        throw new NotFoundException(
          `UserHouse with userId ${userId} and houseId ${houseId} not found.`,
        );
      }

      // Check if the user is an admin
      if (!operatingUserHouse.isAdmin) {
        throw new ForbiddenException('Only admins can update admin status.');
      }

      const targetUserHouse = await this.prisma.userHouse.findUnique({
        where: {
          userId_houseId: {
            userId: targetUserId,
            houseId,
          },
        },
      });

      if (!targetUserHouse) {
        throw new NotFoundException(
          `UserHouse with userId ${targetUserId} and houseId ${houseId} not found.`,
        );
      }

      // Check if the user is not updating their own admin status
      if (userId === targetUserId) {
        throw new BadRequestException(
          'Users cannot update their own admin status.',
        );
      }

      const updatedAdminStatus = await this.prisma.userHouse.update({
        where: {
          userId_houseId: {
            userId: targetUserId,
            houseId: houseId,
          },
        },
        data: {
          isAdmin,
        },
        select: {
          isAdmin: true,
        },
      });

      return updatedAdminStatus;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUserFromHouse(
    userId: number,
    { userId: targetUserId, houseId }: DeleteUserHouseDto,
  ) {
    try {
      const operatingUserHouse = await this.prisma.userHouse.findUnique({
        where: {
          userId_houseId: {
            userId,
            houseId,
          },
        },
      });

      if (!operatingUserHouse) {
        throw new NotFoundException(
          `UserHouse with userId ${userId} and houseId ${houseId} not found.`,
        );
      }

      // Check if a non-admin user tries to remove a house member
      if (!operatingUserHouse.isAdmin && userId !== targetUserId) {
        throw new ForbiddenException('Only admins can remove a house member');
      }

      const targetUserHouse = await this.prisma.userHouse.findUnique({
        where: {
          userId_houseId: {
            userId: targetUserId,
            houseId,
          },
        },
      });

      if (!targetUserHouse) {
        throw new NotFoundException(
          `UserHouse with userId ${targetUserId} and houseId ${houseId} not found.`,
        );
      }

      await this.prisma.userHouse.delete({
        where: {
          userId_houseId: {
            userId: targetUserId,
            houseId,
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
