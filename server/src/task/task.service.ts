import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto) {
    try {
      const task = await this.prisma.task.create({
        data: dto,
      });

      return task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async getTask(taskId: number) {
    try {
      const task = await this.prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }

      return task;
    } catch (error) {
      console.error('Error getting task:', error);
      throw error;
    }
  }

  async updateTask(taskId: number, dto: UpdateTaskDto) {
    try {
      const task = await this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: dto,
      });

      return task;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }
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

  async deleteTask(taskId: number) {
    try {
      await this.prisma.task.delete({
        where: {
          id: taskId,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}
