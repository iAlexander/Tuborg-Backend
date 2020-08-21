import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IdParamsDto } from "./id-params.dto";
import { QuestionCategoryEnum } from "../../types";

export class NextQuestionDto extends IdParamsDto {
  @ApiProperty({
    enum: QuestionCategoryEnum
  })
  @IsNotEmpty()
  @IsEnum(QuestionCategoryEnum)
  category: QuestionCategoryEnum;
}