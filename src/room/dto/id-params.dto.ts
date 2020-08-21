import {IsEnum, IsNumberString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdParamsDto {
  @ApiProperty()
  @IsNumberString()
  @IsEnum(['1', '2', '3', '4', '5'])
  id: number;
}