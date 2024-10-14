import { IsOptional, IsString, MinLength } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'john_doe_updated' })
  @IsString()
  @IsOptional()
  readonly username?: string

  @ApiPropertyOptional({ example: 'newpassword123' })
  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly password?: string
}
