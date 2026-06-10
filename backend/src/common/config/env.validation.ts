import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  IP_ADDRESS: string;

  @IsString()
  @IsEnum(['development', 'production', 'test'])
  NODE_ENV: string;

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
