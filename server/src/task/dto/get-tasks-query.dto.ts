import { IsNumberString } from 'class-validator';

export class GetTasksQueryDto {
  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;
}
