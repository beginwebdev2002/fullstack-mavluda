import { AppConfigService } from '@common/config/app-config.service';
import type { AuthenticatedRequest } from '@common/interfaces/authenticated-request.interface';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: AppConfigService);
    login(loginDto: LoginDto, res: Response): Promise<AuthResponse>;
    register(registerDto: RegisterDto, res: Response): Promise<AuthResponse>;
    refresh(req: AuthenticatedRequest, res: Response): Promise<AuthResponse>;
    me(req: AuthenticatedRequest): Promise<Omit<import("../user").User, "createdAt" | "passwordHash"> | null>;
    isAdmin(req: AuthenticatedRequest, res: Response): Promise<AuthResponse>;
    private setRefreshTokenCookie;
}
