import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, IsUrl, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  MONGO_URI: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  TELEGRAM_BOT_TOKEN: string;

  @IsString()
  ALIF_MERCHANT_ID: string;

  @IsString()
  ALIF_TOKEN: string;

  @IsNumber()
  PORT: number;

  @IsUrl({ require_tld: false })
  FRONTEND_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
