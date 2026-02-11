import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { TelegramAuthService } from './telegram-auth.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from '../common/decorators/public.decorator';

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
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
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
