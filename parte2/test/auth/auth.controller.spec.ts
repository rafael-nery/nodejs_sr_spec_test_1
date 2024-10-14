import { Test, TestingModule } from '@nestjs/testing'
import { UnauthorizedException } from '@nestjs/common'
import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { LoginDto } from '@/auth/dto/login.dto'

const mockAuthService = {
  login: jest.fn()
}

describe('AuthController', () => {
  let controller: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compile()

    controller = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const loginDto: LoginDto = { username: 'testuser', password: 'testpassword' }
      const token = { access_token: 'signedtoken' }
      mockAuthService.login.mockResolvedValue(token)

      expect(await controller.login(loginDto)).toEqual(token)
      expect(authService.login).toHaveBeenCalledWith(loginDto)
    })

    it('should throw UnauthorizedException on invalid credentials', async () => {
      const loginDto: LoginDto = { username: 'testuser', password: 'wrongpassword' }
      mockAuthService.login.mockRejectedValue(new UnauthorizedException())

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException)
      expect(authService.login).toHaveBeenCalledWith(loginDto)
    })
  })
})
