// src/auth/auth.module.ts
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from '@/user/user.module'
import { AuthService } from '@/auth/auth.service'
import { JwtStrategy } from '@/auth/jwt.strategy'
import { AuthController } from '@/auth/auth.controller'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'seuSegredoAqui',
        signOptions: { expiresIn: '60m' }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
