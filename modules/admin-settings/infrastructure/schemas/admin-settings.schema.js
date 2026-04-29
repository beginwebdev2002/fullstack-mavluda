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
exports.AdminSettingsSchema = exports.AdminSettingsSchemaEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let AdminSettingsSchemaEntity = class AdminSettingsSchemaEntity {
    _id;
    location;
    socialLinks;
    workHours;
    ownerInfo;
    biography;
    philosophy;
    galleryCategories;
    treatmentCategories;
    veilSilhouettes;
    veilFabrics;
    veilTrainLengths;
    veilNecklines;
};
exports.AdminSettingsSchemaEntity = AdminSettingsSchemaEntity;
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: process.env.SETTINGS_ID }),
    __metadata("design:type", String)
], AdminSettingsSchemaEntity.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], AdminSettingsSchemaEntity.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Map, of: String, default: {} }),
    __metadata("design:type", Map)
], AdminSettingsSchemaEntity.prototype, "socialLinks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Map, of: String, default: {} }),
    __metadata("design:type", Map)
], AdminSettingsSchemaEntity.prototype, "workHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], AdminSettingsSchemaEntity.prototype, "ownerInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], AdminSettingsSchemaEntity.prototype, "biography", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], AdminSettingsSchemaEntity.prototype, "philosophy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], AdminSettingsSchemaEntity.prototype, "galleryCategories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], AdminSettingsSchemaEntity.prototype, "treatmentCategories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], AdminSettingsSchemaEntity.prototype, "veilSilhouettes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], AdminSettingsSchemaEntity.prototype, "veilFabrics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], AdminSettingsSchemaEntity.prototype, "veilTrainLengths", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], AdminSettingsSchemaEntity.prototype, "veilNecklines", void 0);
exports.AdminSettingsSchemaEntity = AdminSettingsSchemaEntity = __decorate([
    (0, mongoose_1.Schema)({ collection: 'admin_settings', timestamps: true })
], AdminSettingsSchemaEntity);
exports.AdminSettingsSchema = mongoose_1.SchemaFactory.createForClass(AdminSettingsSchemaEntity);
//# sourceMappingURL=admin-settings.schema.js.map