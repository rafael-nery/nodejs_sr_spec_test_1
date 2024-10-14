import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
