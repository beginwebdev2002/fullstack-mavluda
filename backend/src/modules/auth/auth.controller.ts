import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { TelegramAuthService } from './telegram-auth.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from '@common/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';

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

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponse> {
    const { access_token, refresh_token } = await this.authService.login(loginDto);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { access_token };
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponse> {
    const { access_token, refresh_token } = await this.authService.register(registerDto);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { access_token };
  }

  @Public()
  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<AuthResponse> {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const { access_token, refresh_token } = await this.authService.refreshToken(refreshToken);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { access_token };
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Initiates Google OAuth2 flow
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateGoogleUser(req.user);
    const { access_token, refresh_token } = await this.authService.googleLogin(user);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Redirect to frontend with access token in query string or handle differently based on frontend setup
    // For now returning the token directly.
    res.redirect(`http://localhost:4200/auth/login?token=${access_token}`);
  }

  @Post('telegram')
  async telegramAuth(
    @Body() body: { initData: string },
  ): Promise<TelegramAuthResponse> {
    if (!body.initData) {
      throw new UnauthorizedException('No initData provided');
    }
    const user = await this.telegramAuthService.validateInitData(body.initData);
    // Use AuthService logic to return JWT
    // const payload = { sub: user.id, role: user.role };
    // Assuming we want to return token here too
    // return this.authService.login(user); (need user object with email/id)
    return { success: true, user };
  }
}
