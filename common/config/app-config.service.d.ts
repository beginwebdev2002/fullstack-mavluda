import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.validation';
export declare class AppConfigService {
    private configService;
    constructor(configService: ConfigService<EnvironmentVariables, true>);
    get port(): number;
    get nodeEnv(): string;
    get apiPrefix(): string;
    get frontendUrl(): string;
    get mongoUri(): string;
    get mongoDbName(): string;
    get jwtSecret(): string;
    get jwtExpiresIn(): string;
    get jwtRefreshSecret(): string;
    get jwtRefreshExpiresIn(): string;
    get adminEmail(): string;
    get adminPassword(): string;
    get hashSalt(): number;
    get telegramBotToken(): string;
    get telegramWebAppUrl(): string | undefined;
    get alifMerchantId(): string | undefined;
    get alifToken(): string | undefined;
    get alifCallbackKey(): string | undefined;
    get cardPaymentApiKey(): string | undefined;
    get logLevel(): string;
    get settingsId(): string;
}
