declare class EnvironmentVariables {
    PORT: number;
    NODE_ENV: string;
    API_PREFIX: string;
    FRONTEND_URL: string;
    MONGO_URI: string;
    MONGO_DB_NAME: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_WEBAPP_URL: string;
    ALIF_MERCHANT_ID: string;
    ALIF_TOKEN: string;
    ALIF_CALLBACK_KEY: string;
    CARD_PAYMENT_API_KEY: string;
    LOG_LEVEL: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
