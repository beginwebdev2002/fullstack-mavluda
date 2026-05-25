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
        return this.configService.get('PORT', { infer: true });
    }
    get nodeEnv() {
        return this.configService.get('NODE_ENV', { infer: true });
    }
    get frontendUrl() {
        return this.configService.get('FRONTEND_URL', { infer: true });
    }
    get mongoUri() {
        return this.configService.get('MONGO_URI', { infer: true });
    }
    get mongoDbName() {
        return this.configService.get('MONGO_DB_NAME', { infer: true });
    }
    get jwtSecret() {
        return this.configService.get('JWT_ACCESS_SECRET', { infer: true });
    }
    get jwtExpiresIn() {
        return this.configService.get('JWT_ACCESS_EXPIRES_IN', { infer: true });
    }
    get jwtRefreshSecret() {
        return this.configService.get('JWT_REFRESH_SECRET', { infer: true });
    }
    get jwtRefreshExpiresIn() {
        return this.configService.get('JWT_REFRESH_EXPIRES_IN', { infer: true });
    }
    get adminEmail() {
        return this.configService.get('ADMIN_EMAIL', { infer: true });
    }
    get adminPassword() {
        return this.configService.get('ADMIN_PASSWORD', { infer: true });
    }
    get hashSalt() {
        return this.configService.get('HASH_SALT', { infer: true });
    }
    get logLevel() {
        return this.configService.get('LOG_LEVEL', { infer: true });
    }
    get settingsId() {
        return this.configService.get('SETTINGS_ID', { infer: true });
    }
};
exports.AppConfigService = AppConfigService;
exports.AppConfigService = AppConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppConfigService);
//# sourceMappingURL=app-config.service.js.map