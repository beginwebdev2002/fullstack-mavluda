import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      // If login throws custom Unauthorized stuff, we bubble it up
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    try {
      return await this.authService.register(registerDto);
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
