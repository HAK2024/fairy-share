import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // Create task
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

  // Update task
  async updateTask(taskId: number, dto: UpdateTaskDto) {
    try {
      const task = await this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: dto,
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

  // Update the status of the task completion
  async updateTaskStatus(taskId: number, dto: UpdateTaskStatusDto) {
    try {
      const task = await this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: dto,
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

  // Delete task
  async deleteTask(taskId: number) {
    try {
      const task = await this.prisma.task.delete({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }

      return { status: HttpStatus.NO_CONTENT };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}
