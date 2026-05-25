import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.validation';

@Injectable()
export class AppConfigService {
  constructor(
    private configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  get port(): number {
    return this.configService.get('PORT', { infer: true });
  }

  get nodeEnv(): string {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  get frontendUrl(): string {
    return this.configService.get('FRONTEND_URL', { infer: true });
  }

  get mongoUri(): string {
    return this.configService.get('MONGO_URI', { infer: true });
  }

  get mongoDbName(): string {
    return this.configService.get('MONGO_DB_NAME', { infer: true });
  }

  get jwtSecret(): string {
    return this.configService.get('JWT_ACCESS_SECRET', { infer: true });
  }

  get jwtExpiresIn(): string {
    return this.configService.get('JWT_ACCESS_EXPIRES_IN', { infer: true });
  }

  get jwtRefreshSecret(): string {
    return this.configService.get('JWT_REFRESH_SECRET', { infer: true });
  }

  get jwtRefreshExpiresIn(): string {
    return this.configService.get('JWT_REFRESH_EXPIRES_IN', { infer: true });
  }

  get adminEmail(): string {
    return this.configService.get('ADMIN_EMAIL', { infer: true });
  }

  get adminPassword(): string {
    return this.configService.get('ADMIN_PASSWORD', { infer: true });
  }

  get hashSalt(): number {
    return this.configService.get('HASH_SALT', { infer: true });
  }

  get logLevel(): string {
    return this.configService.get('LOG_LEVEL', { infer: true });
  }

  get settingsId(): string {
    return this.configService.get('SETTINGS_ID', { infer: true });
  }
}
