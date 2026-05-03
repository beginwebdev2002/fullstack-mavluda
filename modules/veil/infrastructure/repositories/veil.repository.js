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
exports.VeilRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const veil_entity_1 = require("../../domain/veil.entity");
const veil_schema_1 = require("../schemas/veil.schema");
const file_system_1 = require("../../../../common/utils/file-system");
let VeilRepository = class VeilRepository {
    veilModel;
    constructor(veilModel) {
        this.veilModel = veilModel;
    }
    async count() {
        return this.veilModel.countDocuments().exec();
    }
    async findAll() {
        const docs = await this.veilModel.find().exec();
        return docs.map((doc) => this.toDomain(doc));
    }
    async findAvailable() {
        const docs = await this.veilModel.find({ isAvailable: true }).exec();
        return docs.map((doc) => this.toDomain(doc));
    }
    async create(veil) {
        const created = new this.veilModel(veil);
        const doc = await created.save();
        return this.toDomain(doc);
    }
    async findById(id) {
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return null;
        }
        const doc = await this.veilModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async update(id, updateData) {
        const veil = await this.findById(id);
        if (!veil) {
            return null;
        }
        if (veil.image) {
            (0, file_system_1.fileDelete)(veil.image);
        }
        const doc = await this.veilModel
            .findByIdAndUpdate(id, { $set: updateData }, { new: true })
            .exec();
        return doc ? this.toDomain(doc) : null;
    }
    async delete(id) {
        const result = await this.veilModel.findByIdAndDelete(id).exec();
        return !!result;
    }
    toDomain(doc) {
        const { _id, name, description, price, rentalPrice, image, category, isAvailable, sku, silhouette, neckline, fabric, trainLength, stock, createdAt, updatedAt, } = doc;
        return new veil_entity_1.Veil({
            id: _id.toString(),
            name,
            description,
            price,
            rentalPrice,
            image,
            category,
            isAvailable,
            sku,
            silhouette,
            neckline,
            fabric,
            trainLength,
            stock,
            createdAt,
            updatedAt,
        });
    }
};
exports.VeilRepository = VeilRepository;
exports.VeilRepository = VeilRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(veil_schema_1.VeilSchemaEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VeilRepository);
//# sourceMappingURL=veil.repository.js.map