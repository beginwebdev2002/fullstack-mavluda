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
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { TelegramAuthService } from './telegram-auth.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from '@common/decorators/public.decorator';

import {
  AuthResponse,
  TelegramAuthResponse,
} from './interfaces/auth-response.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly telegramAuthService: TelegramAuthService,
    private readonly authService: AuthService,
  ) {}

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
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
      const { access_token, refresh_token, user } = await this.authService.login(loginDto);
      this.setRefreshTokenCookie(res, refresh_token);
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
      const { access_token, refresh_token, user } = await this.authService.register(registerDto);
      this.setRefreshTokenCookie(res, refresh_token);
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
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const refreshToken = req.cookies?.['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const { access_token, refresh_token: newRefreshToken, user } = await this.authService.refreshTokens(refreshToken);
      this.setRefreshTokenCookie(res, newRefreshToken);
      return { access_token, user };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  @Post('telegram')
  async telegramAuth(
    @Body() body: { initData: string },
  ): Promise<TelegramAuthResponse> {
    try {
      if (!body.initData) {
        throw new UnauthorizedException('No initData provided');
      }
      const user = await this.telegramAuthService.validateInitData(
        body.initData,
      );
      return { success: true, user };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('INVALID_TOKEN');
    }
  }
}
