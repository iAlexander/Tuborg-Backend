import {IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EndGameDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isFrontend: boolean;
}