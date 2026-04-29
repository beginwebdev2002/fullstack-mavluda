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
exports.AdminSettingsService = void 0;
const common_1 = require("@nestjs/common");
const admin_settings_repository_1 = require("../infrastructure/repositories/admin-settings.repository");
let AdminSettingsService = class AdminSettingsService {
    adminSettingsRepository;
    constructor(adminSettingsRepository) {
        this.adminSettingsRepository = adminSettingsRepository;
    }
    async getSettings() {
        return this.adminSettingsRepository.getSettings();
    }
    async updateSettings(settings) {
        return this.adminSettingsRepository.updateSettings(settings);
    }
    async createSettings(settings) {
        return this.adminSettingsRepository.createSettings(settings);
    }
    async deleteSettings() {
        return this.adminSettingsRepository.deleteSettings();
    }
};
exports.AdminSettingsService = AdminSettingsService;
exports.AdminSettingsService = AdminSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_settings_repository_1.AdminSettingsRepository])
], AdminSettingsService);
//# sourceMappingURL=admin-settings.service.js.map