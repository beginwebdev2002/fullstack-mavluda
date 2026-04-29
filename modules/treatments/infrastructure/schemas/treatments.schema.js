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
exports.TreatmentsSchema = exports.TreatmentsSchemaEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let TreatmentsSchemaEntity = class TreatmentsSchemaEntity {
    name;
    description;
    price;
    duration;
    category;
    imageUrl;
    active;
    createdAt;
    updatedAt;
};
exports.TreatmentsSchemaEntity = TreatmentsSchemaEntity;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TreatmentsSchemaEntity.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TreatmentsSchemaEntity.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TreatmentsSchemaEntity.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TreatmentsSchemaEntity.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TreatmentsSchemaEntity.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TreatmentsSchemaEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], TreatmentsSchemaEntity.prototype, "active", void 0);
exports.TreatmentsSchemaEntity = TreatmentsSchemaEntity = __decorate([
    (0, mongoose_1.Schema)({ collection: 'treatments', timestamps: true })
], TreatmentsSchemaEntity);
exports.TreatmentsSchema = mongoose_1.SchemaFactory.createForClass(TreatmentsSchemaEntity);
//# sourceMappingURL=treatments.schema.js.map