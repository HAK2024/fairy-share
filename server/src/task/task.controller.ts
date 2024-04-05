import { GetUser } from '../auth/decorator';
import { AuthGuard } from '../auth/guard';
import {
  CreateTaskDto,
  GetTasksQueryDto,
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from './dto';
import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@GetUser('id') userId: number, @Query() query: GetTasksQueryDto) {
    return this.taskService.getTasks(userId, query);
  }

  @Get(':taskId')
  GetTask(
    @GetUser('id') userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return this.taskService.getTask(userId, taskId);
  }

  @Post()
  createTask(
    @GetUser('id') userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.createTask(userId, createTaskDto);
  }

  @Put(':taskId')
  updateTask(
    @GetUser('id') userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(userId, taskId, updateTaskDto);
  }

  @Put(':taskId/status')
  updateTaskStatus(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateTaskStatus(taskId, updateTaskStatusDto);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(
    @GetUser('id') userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return this.taskService.deleteTask(userId, taskId);
  }
}
