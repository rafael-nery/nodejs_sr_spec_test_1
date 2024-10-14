import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from '@/auth/auth.service'
import { LoginDto } from '@/auth/dto/login.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login de usuário' })
  @ApiResponse({ status: 201, description: 'Token JWT retornado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto)
    if (!token) {
      throw new UnauthorizedException('Credenciais inválidas')
    }
    return token
  }
}
