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
exports.PartnershipRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const partnership_entity_1 = require("../../domain/partnership.entity");
const partnership_schema_1 = require("../schemas/partnership.schema");
let PartnershipRepository = class PartnershipRepository {
    partnershipModel;
    constructor(partnershipModel) {
        this.partnershipModel = partnershipModel;
    }
    async findAll() {
        const docs = await this.partnershipModel.find().exec();
        return docs.map((doc) => this.toDomain(doc));
    }
    async create(partnership) {
        const created = new this.partnershipModel(partnership);
        const doc = await created.save();
        return this.toDomain(doc);
    }
    async findById(id) {
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return null;
        }
        const doc = await this.partnershipModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async update(id, updateData) {
        const doc = await this.partnershipModel
            .findByIdAndUpdate(id, { $set: updateData }, { new: true })
            .exec();
        return doc ? this.toDomain(doc) : null;
    }
    async delete(id) {
        const result = await this.partnershipModel.findByIdAndDelete(id).exec();
        return !!result;
    }
    toDomain(doc) {
        const d = doc;
        return new partnership_entity_1.Partnership(d._id.toString(), d.partnerName, d.contactEmail, d.type, d.status, d.createdAt);
    }
};
exports.PartnershipRepository = PartnershipRepository;
exports.PartnershipRepository = PartnershipRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(partnership_schema_1.PartnershipSchemaEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PartnershipRepository);
//# sourceMappingURL=partnership.repository.js.map