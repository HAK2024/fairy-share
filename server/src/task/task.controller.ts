import { AuthGuard } from '../auth/guard';
import { UpdateTaskDto, UpdateTaskStatusDto } from './dto';

import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  // To edit task
  @Patch(':taskId')
  updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  // To update the status of completion of the task
  @Patch(':taskId/status')
  updateTaskStatus(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateTaskStatus(taskId, updateTaskStatusDto);
  }
}
