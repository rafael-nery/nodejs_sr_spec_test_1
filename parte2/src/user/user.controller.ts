import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { UserService } from '@/user/user.service'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { User } from '@/user/schemas/user.schema'
import { UpdateUserDto } from '@/user/dto/update-user.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.'
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter detalhes de um usuário pelo username' })
  @ApiResponse({ status: 200, description: 'Detalhes do usuário retornados com sucesso.' })
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findOne(username)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }
}
