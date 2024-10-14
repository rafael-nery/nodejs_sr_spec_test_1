import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Tipo que representa um documento de usuário no MongoDB.
 *
 * Combina a classe `User` com as funcionalidades de documento do Mongoose.
 */
export type UserDocument = User & Document;

/**
 * Esquema Mongoose para a entidade `User`.
 *
 * Define a estrutura e as regras de validação para os documentos de usuário no MongoDB.
 */
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
