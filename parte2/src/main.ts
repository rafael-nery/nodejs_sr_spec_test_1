import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import * as mongoSanitize from 'express-mongo-sanitize'
import { AppModule } from '@/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppLogger } from '@/common/logger/logger.service'
import * as dotenv from 'dotenv'
import './instrument'

dotenv.config()

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    logger: new AppLogger()
  })

  app.use(helmet())

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Muitas requisições deste IP, por favor tente novamente após 15 minutos'
    })
  )

  app.use(mongoSanitize())
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: '*', // Podemos definir uma URL específica...
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle('API de Usuários')
    .setDescription('API RESTful para gerenciamento de usuários')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(3000)
}

void bootstrap()
