"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    alifMerchantId: process.env.ALIF_MERCHANT_ID,
    alifToken: process.env.ALIF_TOKEN,
    port: parseInt(process.env.PORT ?? '3000', 10),
    frontendUrl: process.env.FRONTEND_URL,
});
//# sourceMappingURL=configuration.js.map