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
exports.TreatmentsService = void 0;
const common_1 = require("@nestjs/common");
const treatments_repository_1 = require("../infrastructure/repositories/treatments.repository");
const utils_1 = require("../../../common/utils");
let TreatmentsService = class TreatmentsService {
    treatmentsRepository;
    constructor(treatmentsRepository) {
        this.treatmentsRepository = treatmentsRepository;
    }
    async count() {
        return this.treatmentsRepository.count();
    }
    async findAll() {
        return this.treatmentsRepository.findAll();
    }
    async create(treatments) {
        return this.treatmentsRepository.create(treatments);
    }
    async findOne(id) {
        const treatment = await this.treatmentsRepository.findById(id);
        if (!treatment) {
            throw new Error(`Service with ID ${id} not found`);
        }
        return treatment;
    }
    async update(id, updateTreatmentsDto) {
        const existing = await this.treatmentsRepository.findById(id);
        if (!existing) {
            throw new Error(`Service with ID ${id} not found`);
        }
        const updated = await this.treatmentsRepository.update(id, updateTreatmentsDto);
        if (!updated) {
            throw new Error(`Service with ID ${id} not found`);
        }
        if (updated?.imageUrl && existing?.imageUrl) {
            await (0, utils_1.deleteFileSafe)(existing.imageUrl);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.treatmentsRepository.delete(id);
        if (!deleted) {
            throw new Error(`Service with ID ${id} not found`);
        }
        if (deleted?.imageUrl) {
            await (0, utils_1.deleteFileSafe)(deleted.imageUrl);
        }
    }
    async deleteFile(filePath) {
        try {
            await (0, utils_1.deleteFileSafe)(filePath);
        }
        catch (error) {
            console.error('Error deleting file:', error);
        }
    }
};
exports.TreatmentsService = TreatmentsService;
exports.TreatmentsService = TreatmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [treatments_repository_1.TreatmentsRepository])
], TreatmentsService);
//# sourceMappingURL=treatments.service.js.map