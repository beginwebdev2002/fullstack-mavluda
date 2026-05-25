import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.validation';
export declare class AppConfigService {
    private configService;
    constructor(configService: ConfigService<EnvironmentVariables, true>);
    get port(): number;
    get nodeEnv(): string;
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
    get logLevel(): string;
    get settingsId(): string;
}
