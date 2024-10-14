import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
