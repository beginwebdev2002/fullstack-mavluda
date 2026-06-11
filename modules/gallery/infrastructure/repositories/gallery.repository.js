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
exports.GalleryRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const gallery_entity_1 = require("../../domain/gallery.entity");
const gallery_schema_1 = require("../schemas/gallery.schema");
let GalleryRepository = class GalleryRepository {
    galleryModel;
    constructor(galleryModel) {
        this.galleryModel = galleryModel;
    }
    async count() {
        return this.galleryModel.countDocuments().exec();
    }
    async findAll() {
        const docs = await this.galleryModel.find().exec();
        const doc = docs.map((doc) => this.toDomain(doc));
        return doc;
    }
    async create(gallery) {
        const created = new this.galleryModel(gallery);
        const doc = await created.save();
        return this.toDomain(doc);
    }
    async findById(id) {
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return null;
        }
        const doc = await this.galleryModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async update(id, updateData) {
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return null;
        }
        const safeUpdateData = this.sanitizeUpdateData(updateData);
        const doc = await this.galleryModel
            .findByIdAndUpdate(id, { $set: safeUpdateData }, { new: true })
            .exec();
        return doc ? this.toDomain(doc) : null;
    }
    sanitizeUpdateData(updateData) {
        const allowedKeys = [
            'title',
            'imageUrl',
            'category',
            'status',
            'alt',
        ];
        const sanitized = {};
        for (const key of allowedKeys) {
            const value = updateData[key];
            if (value !== undefined) {
                const keyAsString = String(key);
                if (!keyAsString.includes('$') && !keyAsString.includes('.')) {
                    sanitized[keyAsString] = value;
                }
            }
        }
        return sanitized;
    }
    async delete(id) {
        const result = await this.galleryModel.findByIdAndDelete(id).exec();
        return !!result;
    }
    toDomain(doc) {
        const d = doc;
        return new gallery_entity_1.Gallery(d._id.toString(), d.title, d.imageUrl, d.category, d.status, d.alt);
    }
};
exports.GalleryRepository = GalleryRepository;
exports.GalleryRepository = GalleryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(gallery_schema_1.GallerySchemaEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GalleryRepository);
//# sourceMappingURL=gallery.repository.js.map