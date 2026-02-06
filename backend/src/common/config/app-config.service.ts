import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT', { infer: true }) ?? 3000;
  }

  get nodeEnv(): string {
    return (
      this.configService.get<string>('NODE_ENV', { infer: true }) ??
      'development'
    );
  }

  get apiPrefix(): string {
    return (
      this.configService.get<string>('API_PREFIX', { infer: true }) ?? 'api'
    );
  }

  get frontendUrl(): string {
    return (
      this.configService.get<string>('FRONTEND_URL', { infer: true }) ?? ''
    );
  }

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI', { infer: true }) ?? '';
  }

  get mongoDbName(): string {
    return (
      this.configService.get<string>('MONGO_DB_NAME', { infer: true }) ??
      'mavluda-beauty'
    );
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET', { infer: true }) ?? '';
  }

  get jwtExpiration(): string {
    return (
      this.configService.get<string>('JWT_EXPIRATION', { infer: true }) ?? '1d'
    );
  }

  get telegramBotToken(): string {
    return (
      this.configService.get<string>('TELEGRAM_BOT_TOKEN', { infer: true }) ??
      ''
    );
  }

  get telegramWebAppUrl(): string {
    return (
      this.configService.get<string>('TELEGRAM_WEBAPP_URL', { infer: true }) ??
      ''
    );
  }

  get alifMerchantId(): string {
    return (
      this.configService.get<string>('ALIF_MERCHANT_ID', { infer: true }) ?? ''
    );
  }

  get alifToken(): string {
    return this.configService.get<string>('ALIF_TOKEN', { infer: true }) ?? '';
  }

  get alifCallbackKey(): string {
    return (
      this.configService.get<string>('ALIF_CALLBACK_KEY', { infer: true }) ?? ''
    );
  }

  get cardPaymentApiKey(): string {
    return (
      this.configService.get<string>('CARD_PAYMENT_API_KEY', { infer: true }) ??
      ''
    );
  }
}
