import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '@/user/schemas/user.schema'
import { UserService } from '@/user/user.service'
import { UserController } from '@/user/user.controller'

/**
 * Módulo responsável por gerenciar a entidade `User`.
 *
 * Este módulo configura o esquema Mongoose para `User`, registra o serviço e o controlador
 * associados, e exporta o `UserService` para ser utilizado em outros módulos da aplicação.
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
