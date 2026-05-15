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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const telegram_auth_service_1 = require("./telegram-auth.service");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let AuthController = class AuthController {
    telegramAuthService;
    authService;
    constructor(telegramAuthService, authService) {
        this.telegramAuthService = telegramAuthService;
        this.authService = authService;
    }
    setRefreshTokenCookie(res, refreshToken) {
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    async login(loginDto, res) {
        try {
            const { access_token, refresh_token, user } = await this.authService.login(loginDto);
            this.setRefreshTokenCookie(res, refresh_token);
            return { access_token, user };
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('not found')) {
                throw new common_1.NotFoundException('USER_NOT_FOUND');
            }
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async register(registerDto, res) {
        try {
            const { access_token, refresh_token, user } = await this.authService.register(registerDto);
            this.setRefreshTokenCookie(res, refresh_token);
            return { access_token, user };
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('already exists')) {
                throw new common_1.BadRequestException('USER_ALREADY_EXISTS');
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async refresh(req, res) {
        const refreshToken = req.cookies?.['refresh_token'];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token not found');
        }
        try {
            const { access_token, refresh_token: newRefreshToken, user } = await this.authService.refreshTokens(refreshToken);
            this.setRefreshTokenCookie(res, newRefreshToken);
            return { access_token, user };
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async telegramAuth(body) {
        try {
            if (!body.initData) {
                throw new common_1.UnauthorizedException('No initData provided');
            }
            const user = await this.telegramAuthService.validateInitData(body.initData);
            return { success: true, user };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('INVALID_TOKEN');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('telegram'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "telegramAuth", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [telegram_auth_service_1.TelegramAuthService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map