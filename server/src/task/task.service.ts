import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { UpdateTaskDto, UpdateTaskStatusDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async updateTask(taskId: number, dto: UpdateTaskDto) {
    try {
      const task = await this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          title: dto.title,
          date: dto.date,
          note: dto.note,
          assigneeId: dto.assigneeId,
        },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }

      return task;
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
        data: {
          isCompleted: dto.isCompleted,
        },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }

      return { isCompleted: task.isCompleted };
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  }
}
