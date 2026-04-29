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
exports.VeilSchema = exports.VeilSchemaEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let VeilSchemaEntity = class VeilSchemaEntity {
    name;
    description;
    price;
    rentalPrice;
    image;
    category;
    isAvailable;
    sku;
    silhouette;
    neckline;
    fabric;
    trainLength;
    stock;
    createdAt;
    updatedAt;
};
exports.VeilSchemaEntity = VeilSchemaEntity;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], VeilSchemaEntity.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VeilSchemaEntity.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], VeilSchemaEntity.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], VeilSchemaEntity.prototype, "rentalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], VeilSchemaEntity.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], VeilSchemaEntity.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], VeilSchemaEntity.prototype, "isAvailable", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VeilSchemaEntity.prototype, "sku", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VeilSchemaEntity.prototype, "silhouette", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VeilSchemaEntity.prototype, "neckline", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VeilSchemaEntity.prototype, "fabric", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VeilSchemaEntity.prototype, "trainLength", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], VeilSchemaEntity.prototype, "stock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], VeilSchemaEntity.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], VeilSchemaEntity.prototype, "updatedAt", void 0);
exports.VeilSchemaEntity = VeilSchemaEntity = __decorate([
    (0, mongoose_1.Schema)({ collection: 'veils', timestamps: true })
], VeilSchemaEntity);
exports.VeilSchema = mongoose_1.SchemaFactory.createForClass(VeilSchemaEntity);
//# sourceMappingURL=veil.schema.js.map