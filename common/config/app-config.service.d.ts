import { ConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private configService;
    constructor(configService: ConfigService);
    get port(): number;
    get nodeEnv(): string;
    get apiPrefix(): string;
    get frontendUrl(): string;
    get mongoUri(): string;
    get mongoDbName(): string;
    get jwtSecret(): string;
    get jwtExpiresIn(): string;
    get telegramBotToken(): string;
    get telegramWebAppUrl(): string;
    get alifMerchantId(): string;
    get alifToken(): string;
    get alifCallbackKey(): string;
    get cardPaymentApiKey(): string;
    get settingsId(): string;
}
