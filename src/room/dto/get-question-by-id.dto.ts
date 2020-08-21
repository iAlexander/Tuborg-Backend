import {IsEnum, IsNotEmpty, IsNumberString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IdParamsDto } from "./id-params.dto";

export class GetQuestionByIdDto extends IdParamsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  questionId: number;
}