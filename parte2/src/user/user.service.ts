import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as Sentry from '@sentry/node'
import { AppLogger } from '@/common/logger/logger.service'
import { User, UserDocument } from '@/user/schemas/user.schema'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import { UpdateUserDto } from '@/user/dto/update-user.dto'

@Injectable()
export class UserService {
  private readonly logger = new AppLogger()

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log('Criando um novo usuário')
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword
      })
      return createdUser.save()
    } catch (error) {
      Sentry.captureException(error)
      throw error
    }
  }

  async findAll(): Promise<User[]> {
    try {
      this.logger.log('Listando todos os usuários')
      return this.userModel.find().exec()
    } catch (error) {
      Sentry.captureException(error)
      throw error
    }
  }

  async findOne(username: string): Promise<UserDocument> {
    try {
      this.logger.log(`Buscando usuário com username: ${username}`)
      return this.userModel.findOne({ username }).exec()
    } catch (error) {
      Sentry.captureException(error)
      throw error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      this.logger.log(`Atualizando usuário com ID: ${id}`)
      const updateData: any = { ...updateUserDto }
      if (updateUserDto.password) {
        updateData.password = await bcrypt.hash(updateUserDto.password, 10)
      }
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
      if (!updatedUser) {
        this.logger.error(`Usuário com ID ${id} não encontrado`, 'UserService')
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`)
      }
      return updatedUser
    } catch (error) {
      Sentry.captureException(error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      this.logger.log(`Removendo usuário com ID: ${id}`)
      const result = await this.userModel.findByIdAndDelete(id).exec()
      if (!result) {
        this.logger.error(`Usuário com ID ${id} não encontrado`, 'UserService')
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`)
      }
    } catch (error) {
      Sentry.captureException(error)
      throw error
    }
  }
}
