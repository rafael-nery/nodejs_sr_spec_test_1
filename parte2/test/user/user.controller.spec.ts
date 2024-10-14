import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { UserController } from '@/user/user.controller'
import { UserService } from '@/user/user.service'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import { UpdateUserDto } from '@/user/dto/update-user.dto'

const mockUserService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
}

describe('UserController', () => {
  let controller: UserController
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compile()

    controller = module.get<UserController>(UserController)
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', password: 'testpassword' }
      mockUserService.create.mockResolvedValue(createUserDto)

      expect(await controller.create(createUserDto)).toEqual(createUserDto)
      expect(service.create).toHaveBeenCalledWith(createUserDto)
    })
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ username: 'testuser1' }, { username: 'testuser2' }]
      mockUserService.findAll.mockResolvedValue(users)

      expect(await controller.findAll()).toEqual(users)
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a single user', async () => {
      const user = { username: 'testuser' }
      mockUserService.findOne.mockResolvedValue(user)

      expect(await controller.findOne('testuser')).toEqual(user)
      expect(service.findOne).toHaveBeenCalledWith('testuser')
    })
  })

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updateduser' }
      const updatedUser = { username: 'updateduser' }
      mockUserService.update.mockResolvedValue(updatedUser)

      expect(await controller.update('someid', updateUserDto)).toEqual(updatedUser)
      expect(service.update).toHaveBeenCalledWith('someid', updateUserDto)
    })

    it('should throw NotFoundException when user not found', async () => {
      mockUserService.update.mockRejectedValue(new NotFoundException())

      const updateUserDto: UpdateUserDto = { username: 'updateduser' }
      await expect(controller.update('invalidid', updateUserDto)).rejects.toThrow(NotFoundException)
      expect(service.update).toHaveBeenCalledWith('invalidid', updateUserDto)
    })
  })

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      mockUserService.remove.mockResolvedValue(undefined)

      expect(await controller.remove('someid')).toBeUndefined()
      expect(service.remove).toHaveBeenCalledWith('someid')
    })

    it('should throw NotFoundException when user not found', async () => {
      mockUserService.remove.mockRejectedValue(new NotFoundException())

      await expect(controller.remove('invalidid')).rejects.toThrow(NotFoundException)
      expect(service.remove).toHaveBeenCalledWith('invalidid')
    })
  })
})
