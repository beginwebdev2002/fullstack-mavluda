export declare class EnvironmentVariables {
    PORT: number;
    NODE_ENV: string;
    API_PREFIX: string;
    FRONTEND_URL: string;
    MONGO_URI: string;
    MONGO_DB_NAME: string;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    HASH_SALT: number;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_WEBAPP_URL: string;
    ALIF_MERCHANT_ID: string;
    ALIF_TOKEN: string;
    ALIF_CALLBACK_KEY: string;
    CARD_PAYMENT_API_KEY: string;
    LOG_LEVEL: string;
    SETTINGS_ID: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
