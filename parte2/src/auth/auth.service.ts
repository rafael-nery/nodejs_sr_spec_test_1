import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from '@/user/user.service'
import { LoginDto } from '@/auth/dto/login.dto'
import { UserDocument } from '@/user/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const user: UserDocument = await this.userService.findOne(loginDto.username)
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload = { username: user.username, sub: user._id }
      return {
        access_token: this.jwtService.sign(payload)
      }
    }
    throw new UnauthorizedException('Credenciais inválidas')
  }
}
