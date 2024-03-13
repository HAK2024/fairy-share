import { IsBoolean } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsBoolean()
  isCompleted: boolean;
}
