import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { LoginDto } from '@/auth/dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
