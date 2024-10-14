import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from '@/user/user.module'
import { AuthModule } from '@/auth/auth.module'
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'

/**
 * Módulo principal da aplicação NestJS.
 *
 * Este módulo configura as importações de outros módulos essenciais,
 * estabelece a conexão com o banco de dados MongoDB e define provedores globais,
 * como filtros de exceção.
 */
@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/nest-api'),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
