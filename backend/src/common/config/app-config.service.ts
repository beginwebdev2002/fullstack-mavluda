import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return (
      (this.configService.get<number>('PORT', { infer: true }) as number) ??
      3000
    );
  }

  get nodeEnv(): string {
    return (
      (this.configService.get<string>('NODE_ENV', { infer: true }) as string) ??
      'development'
    );
  }

  get apiPrefix(): string {
    return (
      (this.configService.get<string>('API_PREFIX', {
        infer: true,
      }) as string) ?? 'api'
    );
  }

  get frontendUrl(): string {
    return (
      (this.configService.get<string>('FRONTEND_URL', {
        infer: true,
      }) as string) ?? ''
    );
  }

  get mongoUri(): string {
    return (
      (this.configService.get<string>('MONGO_URI', {
        infer: true,
      }) as string) ?? ''
    );
  }

  get mongoDbName(): string {
    return (
      (this.configService.get<string>('MONGO_DB_NAME', {
        infer: true,
      }) as string) ?? 'mavluda-beauty'
    );
  }

  get jwtSecret(): string {
    return (
      (this.configService.get<string>('JWT_SECRET', {
        infer: true,
      }) as string) ?? ''
    );
  }

  get jwtExpiresIn(): number {
    return (
      (this.configService.get<number>('JWT_EXPIRES_IN', {
        infer: true,
      }) as number) ?? 60 * 60 * 24
    );
  }

  get telegramBotToken(): string {
    return (
      (this.configService.get<string>('TELEGRAM_BOT_TOKEN', {
        infer: true,
      }) as string) ?? ''
    );
  }

  get telegramWebAppUrl(): string {
    return (
      (this.configService.get<string>('TELEGRAM_WEBAPP_URL', {
        infer: true,
      }) as string) ?? ''
    );
  }

  get alifMerchantId(): string {
    return (
      (this.configService.get<string>('ALIF_MERCHANT_ID', {
        infer: true,
      }) as string) ?? ''
    );
  }

  get alifToken(): string {
    return (
      (this.configService.get<string>('ALIF_TOKEN', {
        infer: true,
      }) as string) ?? ''
    );
  }

  get alifCallbackKey(): string {
    return (
      (this.configService.get<string>('ALIF_CALLBACK_KEY', {
        infer: true,
      }) as string) ?? ''
    );
  }

  get cardPaymentApiKey(): string {
    return (
      (this.configService.get<string>('CARD_PAYMENT_API_KEY', {
        infer: true,
      }) as string) ?? ''
    );
  }
  get settingsId(): string {
    return (
      (this.configService.get<string>('SETTINGS_ID', {
        infer: true,
      }) as string) ?? ''
    );
  }
}
