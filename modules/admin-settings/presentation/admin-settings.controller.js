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
exports.AdminSettingsController = void 0;
const common_1 = require("@nestjs/common");
const admin_settings_service_1 = require("../application/admin-settings.service");
const update_admin_settings_dto_1 = require("./dto/update-admin-settings.dto");
const create_admin_settings_dto_1 = require("./dto/create-admin-settings.dto");
let AdminSettingsController = class AdminSettingsController {
    adminSettingsService;
    constructor(adminSettingsService) {
        this.adminSettingsService = adminSettingsService;
    }
    async getSettings() {
        try {
            return await this.adminSettingsService.getSettings();
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('not found')) {
                throw new common_1.NotFoundException('NOT_FOUND');
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async createSettings(createAdminSettingsDto) {
        try {
            return await this.adminSettingsService.createSettings(createAdminSettingsDto);
        }
        catch {
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async updateSettings(updateAdminSettingsDto) {
        try {
            const settings = { ...updateAdminSettingsDto };
            Object.keys(settings).forEach((key) => settings[key] === undefined && delete settings[key]);
            return await this.adminSettingsService.updateSettings(settings);
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('not found')) {
                throw new common_1.NotFoundException('NOT_FOUND');
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async deleteSettings() {
        try {
            return await this.adminSettingsService.deleteSettings();
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('not found')) {
                throw new common_1.NotFoundException('NOT_FOUND');
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
};
exports.AdminSettingsController = AdminSettingsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_settings_dto_1.CreateAdminSettingsDto]),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "createSettings", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_admin_settings_dto_1.UpdateAdminSettingsDto]),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminSettingsController.prototype, "deleteSettings", null);
exports.AdminSettingsController = AdminSettingsController = __decorate([
    (0, common_1.Controller)('admin-settings'),
    __metadata("design:paramtypes", [admin_settings_service_1.AdminSettingsService])
], AdminSettingsController);
//# sourceMappingURL=admin-settings.controller.js.map