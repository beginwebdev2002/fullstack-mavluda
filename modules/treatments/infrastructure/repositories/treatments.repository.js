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
exports.TreatmentsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const treatments_entity_1 = require("../../domain/treatments.entity");
const treatments_schema_1 = require("../schemas/treatments.schema");
let TreatmentsRepository = class TreatmentsRepository {
    treatmentsModel;
    constructor(treatmentsModel) {
        this.treatmentsModel = treatmentsModel;
    }
    async count() {
        return this.treatmentsModel.countDocuments().exec();
    }
    async findAll() {
        const docs = await this.treatmentsModel.find().exec();
        return docs.map((doc) => this.toDomain(doc));
    }
    async create(treatment) {
        const created = new this.treatmentsModel(treatment);
        const doc = await created.save();
        return this.toDomain(doc);
    }
    async findById(id) {
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return null;
        }
        const doc = await this.treatmentsModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async update(id, updateData) {
        const sanitizedUpdateData = this.sanitizeUpdateData(updateData);
        const doc = await this.treatmentsModel
            .findByIdAndUpdate(id, { $set: sanitizedUpdateData }, { new: true })
            .exec();
        return doc ? this.toDomain(doc) : null;
    }
    async delete(id) {
        const result = await this.treatmentsModel.findByIdAndDelete(id).exec();
        return result ? this.toDomain(result) : null;
    }
    sanitizeUpdateData(updateData) {
        const allowedFields = [
            'name',
            'description',
            'price',
            'duration',
            'category',
            'imageUrl',
            'active',
        ];
        const sanitized = {};
        for (const field of allowedFields) {
            const key = String(field);
            if (Object.prototype.hasOwnProperty.call(updateData, key) &&
                this.isSafeUpdateKey(key)) {
                const value = updateData[field];
                if (this.isAllowedUpdateValue(value)) {
                    sanitized[key] = value;
                }
            }
        }
        return sanitized;
    }
    isSafeUpdateKey(key) {
        return !key.startsWith('$') && !key.includes('.');
    }
    isAllowedUpdateValue(value) {
        const valueType = typeof value;
        return (value === null ||
            valueType === 'string' ||
            valueType === 'number' ||
            valueType === 'boolean');
    }
    toDomain(doc) {
        return new treatments_entity_1.Treatments(doc._id.toString(), doc.name, doc.description, doc.price, doc.duration, doc.category, doc.imageUrl, doc.active, doc.createdAt, doc.updatedAt);
    }
};
exports.TreatmentsRepository = TreatmentsRepository;
exports.TreatmentsRepository = TreatmentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(treatments_schema_1.TreatmentsSchemaEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TreatmentsRepository);
//# sourceMappingURL=treatments.repository.js.map