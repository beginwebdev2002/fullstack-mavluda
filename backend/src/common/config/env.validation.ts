import { plainToInstance } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsUrl,
  IsEnum,
  IsOptional,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  @IsEnum(['development', 'production', 'test'])
  NODE_ENV: string;

  @IsString()
  API_PREFIX: string;

  @IsUrl({ require_tld: false })
  FRONTEND_URL: string;

  @IsString()
  MONGO_URI: string;

  @IsString()
  MONGO_DB_NAME: string;

  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsString()
  JWT_ACCESS_EXPIRES_IN: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  JWT_REFRESH_EXPIRES_IN: string;

  @IsNumber()
  HASH_SALT: number;

  @IsString()
  ADMIN_EMAIL: string;

  @IsString()
  ADMIN_PASSWORD: string;

  @IsString()
  TELEGRAM_BOT_TOKEN: string;

  @IsString()
  @IsOptional()
  TELEGRAM_WEBAPP_URL: string;

  @IsString()
  @IsOptional()
  ALIF_MERCHANT_ID: string;

  @IsString()
  @IsOptional()
  ALIF_TOKEN: string;

  @IsString()
  @IsOptional()
  ALIF_CALLBACK_KEY: string;

  @IsString()
  @IsOptional()
  CARD_PAYMENT_API_KEY: string;

  @IsString()
  @IsEnum(['error', 'warn', 'info', 'debug', 'verbose'])
  LOG_LEVEL: string;

  @IsString()
  SETTINGS_ID: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
