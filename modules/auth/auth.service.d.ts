import { UserService } from '@modules/user';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AppConfigService } from '@common/config/app-config.service';
import { User } from '@modules/user';
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    constructor(userService: UserService, jwtService: JwtService, configService: AppConfigService);
    validateUser(email: string, pass: string): Promise<Omit<User, 'passwordHash'> | null>;
    private generateTokens;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: Omit<User, 'passwordHash' | 'createdAt'>;
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: Omit<User, 'passwordHash' | 'createdAt'>;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
        user: Omit<User, 'passwordHash' | 'createdAt'>;
    }>;
}
