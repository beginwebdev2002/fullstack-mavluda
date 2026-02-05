import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { TelegramAuthService } from './telegram-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly telegramAuthService: TelegramAuthService) {}

  @Post('telegram')
  async telegramAuth(@Body() body: { initData: string }) {
    if (!body.initData) {
      throw new UnauthorizedException('No initData provided');
    }
    const user = await this.telegramAuthService.validateInitData(body.initData);
    // In a real app, we would issue a JWT token here.
    // For now, we just return the user to confirm authentication.
    return { success: true, user };
  }
}
