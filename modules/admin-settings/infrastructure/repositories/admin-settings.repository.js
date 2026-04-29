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
exports.AdminSettingsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admin_settings_entity_1 = require("../../domain/admin-settings.entity");
const admin_settings_schema_1 = require("../schemas/admin-settings.schema");
let AdminSettingsRepository = class AdminSettingsRepository {
    settingsModel;
    constructor(settingsModel) {
        this.settingsModel = settingsModel;
    }
    async getSettings() {
        const doc = await this.settingsModel.findOne().exec();
        return doc ? this.toDomain(doc) : null;
    }
    async updateSettings(settings) {
        let doc = await this.settingsModel.findOne().exec();
        if (!doc) {
            doc = new this.settingsModel({
                location: { address: '', latitude: 0, longitude: 0 },
                ownerInfo: { name: '', phoneNumber: '' },
                ...settings,
            });
            await doc.save();
        }
        else {
            doc.set(settings);
            await doc.save();
        }
        return this.toDomain(doc);
    }
    async createSettings(settings) {
        const doc = await this.settingsModel.create(settings);
        return this.toDomain(doc);
    }
    async deleteSettings() {
        const result = await this.settingsModel.deleteOne({}).exec();
        return result.deletedCount > 0;
    }
    toDomain(doc) {
        const socialLinks = doc.socialLinks
            ? Object.fromEntries(doc.socialLinks)
            : {};
        const workHours = doc.workHours
            ? Object.fromEntries(doc.workHours)
            : {};
        return new admin_settings_entity_1.AdminSettings(doc._id.toString(), doc.location, socialLinks, workHours, doc.ownerInfo, doc.biography || '', doc.philosophy || '', doc.galleryCategories || [], doc.treatmentCategories || [], doc.veilSilhouettes || [], doc.veilFabrics || [], doc.veilTrainLengths || [], doc.veilNecklines || []);
    }
};
exports.AdminSettingsRepository = AdminSettingsRepository;
exports.AdminSettingsRepository = AdminSettingsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_settings_schema_1.AdminSettingsSchemaEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminSettingsRepository);
//# sourceMappingURL=admin-settings.repository.js.map