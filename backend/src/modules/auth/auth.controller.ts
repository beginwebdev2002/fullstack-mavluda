import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from '@common/decorators/public.decorator';
import { AppConfigService } from '@common/config/app-config.service';
import {
  AuthResponse,
  TelegramAuthResponse,
} from './interfaces/auth-response.interface';
import type { AuthenticatedRequest } from '@common/interfaces/authenticated-request.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: AppConfigService,
  ) {}

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    const isProduction = this.configService.nodeEnv === 'production';
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });
  }

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    try {
      const { access_token, refreshToken, user } =
        await this.authService.login(loginDto);
      this.setRefreshTokenCookie(res, refreshToken);
      return { access_token, user };
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Public()
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    try {
      const { access_token, refreshToken, user } =
        await this.authService.register(registerDto);
      this.setRefreshTokenCookie(res, refreshToken);
      return { access_token, user };
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('already exists')
      ) {
        throw new BadRequestException('USER_ALREADY_EXISTS');
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Public()
  @Get('refresh')
  async refresh(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const {
        access_token,
        refreshToken: newRefreshToken,
        user,
      } = await this.authService.refreshTokens(refreshToken);
      this.setRefreshTokenCookie(res, newRefreshToken);
      return { access_token, user };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  @Get('me')
  async me(@Req() req: AuthenticatedRequest) {
    const user = this.authService.whoami(req);
    return user;
  }

  @Get('check-admin')
  async isAdmin(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const {
        access_token,
        refreshToken: newRefreshToken,
        user,
      } = await this.authService.refreshTokens(refreshToken);
      this.setRefreshTokenCookie(res, newRefreshToken);
      return { access_token, user };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
