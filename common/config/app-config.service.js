"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfigService = class AppConfigService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    get port() {
        return this.configService.get('PORT', { infer: true }) ?? 3000;
    }
    get nodeEnv() {
        return (this.configService.get('NODE_ENV', { infer: true }) ??
            'development');
    }
    get apiPrefix() {
        return (this.configService.get('API_PREFIX', { infer: true }) ?? 'api');
    }
    get frontendUrl() {
        return (this.configService.get('FRONTEND_URL', { infer: true }) ?? '');
    }
    get mongoUri() {
        return this.configService.get('MONGO_URI', { infer: true }) ?? '';
    }
    get mongoDbName() {
        return (this.configService.get('MONGO_DB_NAME', { infer: true }) ??
            'mavluda-beauty');
    }
    get jwtSecret() {
        return this.configService.get('JWT_SECRET', { infer: true }) ?? '';
    }
    get jwtExpiresIn() {
        return (this.configService.get('JWT_EXPIRES_IN', { infer: true }) ?? '1d');
    }
    get telegramBotToken() {
        return (this.configService.get('TELEGRAM_BOT_TOKEN', { infer: true }) ??
            '');
    }
    get telegramWebAppUrl() {
        return (this.configService.get('TELEGRAM_WEBAPP_URL', { infer: true }) ??
            '');
    }
    get alifMerchantId() {
        return (this.configService.get('ALIF_MERCHANT_ID', { infer: true }) ?? '');
    }
    get alifToken() {
        return this.configService.get('ALIF_TOKEN', { infer: true }) ?? '';
    }
    get alifCallbackKey() {
        return (this.configService.get('ALIF_CALLBACK_KEY', { infer: true }) ?? '');
    }
    get cardPaymentApiKey() {
        return (this.configService.get('CARD_PAYMENT_API_KEY', { infer: true }) ??
            '');
    }
    get settingsId() {
        return this.configService.get('SETTINGS_ID', { infer: true }) ?? '';
    }
};
exports.AppConfigService = AppConfigService;
exports.AppConfigService = AppConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppConfigService);
//# sourceMappingURL=app-config.service.js.map