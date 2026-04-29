"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramAuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const app_config_service_1 = require("../../common/config/app-config.service");
const user_1 = require("../user");
let TelegramAuthService = class TelegramAuthService {
    configService;
    userService;
    constructor(configService, userService) {
        this.configService = configService;
        this.userService = userService;
    }
    async validateInitData(initData) {
        if (!initData) {
            throw new common_1.UnauthorizedException('No initData provided');
        }
        const urlParams = new URLSearchParams(initData);
        const hash = urlParams.get('hash');
        if (!hash) {
            throw new common_1.UnauthorizedException('No hash provided');
        }
        urlParams.delete('hash');
        const dataCheckString = Array.from(urlParams.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');
        const botToken = this.configService.telegramBotToken;
        if (!botToken) {
            throw new Error('TELEGRAM_BOT_TOKEN not configured');
        }
        const secretKey = crypto
            .createHmac('sha256', 'WebAppData')
            .update(botToken)
            .digest();
        const calculatedHash = crypto
            .createHmac('sha256', secretKey)
            .update(dataCheckString)
            .digest('hex');
        if (calculatedHash !== hash) {
            throw new common_1.UnauthorizedException('Invalid hash');
        }
        const userJson = urlParams.get('user');
        if (!userJson) {
            throw new common_1.UnauthorizedException('No user data found');
        }
        const telegramUser = JSON.parse(userJson);
        return this.userService.findOrCreate(telegramUser.id, {
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            username: telegramUser.username,
        });
    }
};
exports.TelegramAuthService = TelegramAuthService;
exports.TelegramAuthService = TelegramAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_config_service_1.AppConfigService,
        user_1.UserService])
], TelegramAuthService);
//# sourceMappingURL=telegram-auth.service.js.map