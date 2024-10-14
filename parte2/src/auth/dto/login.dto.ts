import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  readonly password: string
}
