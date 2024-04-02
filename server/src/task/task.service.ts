import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTasks(userId: number) {
    try {
      const userHouse = await this.prisma.userHouse.findFirst({
        where: { userId },
      });

      if (!userHouse) {
        throw new UnauthorizedException('You do not belong to any house.');
      }

      const tasks = await this.prisma.task.findMany({
        where: {
          houseId: userHouse.houseId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              icon: true,
            },
          },
        },
      });

      return tasks;
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  }

  async getTask(userId: number, taskId: number) {
    try {
      const userHouse = await this.prisma.userHouse.findFirst({
        where: { userId },
      });

      if (!userHouse) {
        throw new UnauthorizedException('You do not belong to any house.');
      }

      const task = await this.prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }

      if (task.houseId !== userHouse.houseId) {
        throw new UnauthorizedException(
          'You do not have permission to get this task.',
        );
      }

      return task;
    } catch (error) {
      console.error('Error getting task:', error);
      throw error;
    }
  }

  async createTask(userId: number, dto: CreateTaskDto) {
    try {
      const userHouse = await this.prisma.userHouse.findFirst({
        where: { userId, houseId: dto.houseId },
      });

      if (!userHouse) {
        throw new ForbiddenException('You do not belong to the house');
      }

      const task = await this.prisma.task.create({
        data: dto,
      });

      return task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(userId: number, taskId: number, dto: UpdateTaskDto) {
    try {
      const userHouse = await this.prisma.userHouse.findFirst({
        where: { userId },
      });

      if (!userHouse) {
        throw new UnauthorizedException('You do not belong to any house.');
      }

      const task = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }

      if (task.houseId !== userHouse.houseId) {
        throw new UnauthorizedException(
          'You do not have permission to update this task.',
        );
      }

      const updatedTask = await this.prisma.task.update({
        where: { id: taskId },
        data: dto,
      });

      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async updateTaskStatus(taskId: number, dto: UpdateTaskStatusDto) {
    try {
      const task = await this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: dto,
      });

      return { isCompleted: task.isCompleted };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }
      console.error('Error updating task status:', error);
      throw error;
    }
  }

  async deleteTask(userId: number, taskId: number) {
    try {
      const userHouse = await this.prisma.userHouse.findFirst({
        where: { userId },
      });

      if (!userHouse) {
        throw new UnauthorizedException('You do not belong to any house.');
      }

      const task = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }

      if (task.houseId !== userHouse.houseId) {
        throw new UnauthorizedException(
          'You do not have permission to delete this task.',
        );
      }

      await this.prisma.task.delete({
        where: {
          id: taskId,
        },
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}
