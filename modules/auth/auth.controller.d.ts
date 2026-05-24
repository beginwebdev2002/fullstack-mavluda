import type { Response } from 'express';
import { TelegramAuthService } from './telegram-auth.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse, TelegramAuthResponse } from './interfaces/auth-response.interface';
import type { AuthenticatedRequest } from '@common/interfaces/authenticated-request.interface';
export declare class AuthController {
    private readonly telegramAuthService;
    private readonly authService;
    constructor(telegramAuthService: TelegramAuthService, authService: AuthService);
    private setRefreshTokenCookie;
    login(loginDto: LoginDto, res: Response): Promise<AuthResponse>;
    register(registerDto: RegisterDto, res: Response): Promise<AuthResponse>;
    refresh(req: AuthenticatedRequest, res: Response): Promise<AuthResponse>;
    telegramAuth(body: {
        initData: string;
    }): Promise<TelegramAuthResponse>;
    me(req: AuthenticatedRequest): Promise<Omit<import("../user").User, "createdAt" | "passwordHash"> | null>;
    isAdmin(req: AuthenticatedRequest, res: Response): Promise<AuthResponse>;
}
