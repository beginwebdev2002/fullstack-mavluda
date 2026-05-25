export declare class EnvironmentVariables {
    PORT: number;
    NODE_ENV: string;
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
    LOG_LEVEL: string;
    SETTINGS_ID: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
