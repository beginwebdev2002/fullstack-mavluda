import { TelegramAuthService } from './telegram-auth.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse, TelegramAuthResponse } from './interfaces/auth-response.interface';
export declare class AuthController {
    private readonly telegramAuthService;
    private readonly authService;
    constructor(telegramAuthService: TelegramAuthService, authService: AuthService);
    login(loginDto: LoginDto): Promise<AuthResponse>;
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    telegramAuth(body: {
        initData: string;
    }): Promise<TelegramAuthResponse>;
}
