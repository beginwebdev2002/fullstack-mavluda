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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../../domain/user.entity");
const user_schema_1 = require("../schemas/user.schema");
let UserRepository = class UserRepository {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async count() {
        return this.userModel.countDocuments().exec();
    }
    async findAll() {
        const docs = await this.userModel.find().exec();
        return docs.map((doc) => this.toDomain(doc));
    }
    async create(user) {
        const createdUser = new this.userModel(user);
        const doc = await createdUser.save();
        return this.toDomain(doc);
    }
    async findById(id) {
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return null;
        }
        const doc = await this.userModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async update(id, updateData) {
        const doc = await this.userModel
            .findByIdAndUpdate(id, { $set: updateData }, { new: true })
            .exec();
        return doc ? this.toDomain(doc) : null;
    }
    async delete(id) {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        return !!result;
    }
    async findByEmail(email) {
        const doc = await this.userModel.findOne({ email }).exec();
        return doc ? this.toDomain(doc) : null;
    }
    toDomain(doc) {
        return new user_entity_1.User(doc._id.toString(), doc.firstName, doc.email, doc.passwordHash, doc.lastName, doc.username, doc.photoUrl, doc.phone, doc.role, doc.createdAt);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserSchemaEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map