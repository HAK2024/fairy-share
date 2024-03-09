import { AuthGuard } from '../auth/guard';
import { CreateTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from './dto';

import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  // Create task
  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  // Edit task
  @Patch(':taskId')
  updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  // Update the status of the task completion
  @Patch(':taskId/status')
  updateTaskStatus(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateTaskStatus(taskId, updateTaskStatusDto);
  }

  // delete task test
  @Delete(':taskId')
  deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.deleteTask(taskId);
  }
}
