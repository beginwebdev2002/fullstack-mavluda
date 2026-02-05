import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { AppConfigService } from '@common/config/app-config.service';
import { UserService } from '@user/application/user.service';
import { User } from '@user/domain/user.entity';

@Injectable()
export class TelegramAuthService {
  constructor(
    private readonly configService: AppConfigService,
    private readonly userService: UserService,
  ) {}

  async validateInitData(initData: string): Promise<User> {
    if (!initData) {
      throw new UnauthorizedException('No initData provided');
    }

    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    if (!hash) {
      throw new UnauthorizedException('No hash provided');
    }

    urlParams.delete('hash');

    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const botToken = this.configService.telegramBotToken;
    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN not configured');
    }

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (calculatedHash !== hash) {
      throw new UnauthorizedException('Invalid hash');
    }

    const userJson = urlParams.get('user');
    if (!userJson) {
      throw new UnauthorizedException('No user data found');
    }

    interface TelegramUser {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    }
    
    const telegramUser = JSON.parse(userJson) as TelegramUser;
    
    return this.userService.findOrCreate(telegramUser.id, {
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name,
      username: telegramUser.username,
    });
  }
}
