import {IsUUID, IsNotEmpty, IsString, Length} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithCode {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  code: string;
}