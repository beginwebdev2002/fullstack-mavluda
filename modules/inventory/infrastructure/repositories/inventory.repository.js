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
exports.InventoryRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const inventory_entity_1 = require("../../domain/inventory.entity");
const inventory_schema_1 = require("../schemas/inventory.schema");
let InventoryRepository = class InventoryRepository {
    inventoryModel;
    constructor(inventoryModel) {
        this.inventoryModel = inventoryModel;
    }
    async findAll() {
        const docs = await this.inventoryModel.find().exec();
        return docs.map((doc) => this.toDomain(doc));
    }
    async create(inventory) {
        const created = new this.inventoryModel(inventory);
        const doc = await created.save();
        return this.toDomain(doc);
    }
    async findById(id) {
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return null;
        }
        const doc = await this.inventoryModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async update(id, updateData) {
        const doc = await this.inventoryModel
            .findByIdAndUpdate(id, { $set: updateData }, { new: true })
            .exec();
        return doc ? this.toDomain(doc) : null;
    }
    async delete(id) {
        const result = await this.inventoryModel.findByIdAndDelete(id).exec();
        return !!result;
    }
    toDomain(doc) {
        const d = doc;
        return new inventory_entity_1.Inventory(d._id.toString(), d.itemName, d.quantity, d.location, d.updatedAt);
    }
};
exports.InventoryRepository = InventoryRepository;
exports.InventoryRepository = InventoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(inventory_schema_1.InventorySchemaEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InventoryRepository);
//# sourceMappingURL=inventory.repository.js.map