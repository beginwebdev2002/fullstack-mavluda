"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const telegram_auth_service_1 = require("./telegram-auth.service");
const auth_service_1 = require("./auth.service");
const user_1 = require("../user");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const app_config_module_1 = require("../../common/config/app-config.module");
const app_config_service_1 = require("../../common/config/app-config.service");
const jwt_strategy_1 = require("./infrastructure/jwt.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_1.UserModule,
            passport_1.PassportModule,
            app_config_module_1.AppConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [app_config_module_1.AppConfigModule],
                useFactory: (configService) => ({
                    secret: configService.jwtSecret,
                    signOptions: { expiresIn: configService.jwtExpiresIn },
                }),
                inject: [app_config_service_1.AppConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [telegram_auth_service_1.TelegramAuthService, auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [telegram_auth_service_1.TelegramAuthService, auth_service_1.AuthService, jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map