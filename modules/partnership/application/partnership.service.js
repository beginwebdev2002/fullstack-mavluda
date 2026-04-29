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
exports.PartnershipService = void 0;
const common_1 = require("@nestjs/common");
const partnership_repository_1 = require("../infrastructure/repositories/partnership.repository");
let PartnershipService = class PartnershipService {
    partnershipRepository;
    constructor(partnershipRepository) {
        this.partnershipRepository = partnershipRepository;
    }
    async findAll() {
        return this.partnershipRepository.findAll();
    }
    async create(createPartnershipDto) {
        return this.partnershipRepository.create({
            ...createPartnershipDto,
            status: 'active',
        });
    }
    async findOne(id) {
        const partnership = await this.partnershipRepository.findById(id);
        if (!partnership) {
            throw new Error(`Partnership with ID ${id} not found`);
        }
        return partnership;
    }
    async update(id, updatePartnershipDto) {
        const updated = await this.partnershipRepository.update(id, updatePartnershipDto);
        if (!updated) {
            throw new Error(`Partnership with ID ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.partnershipRepository.delete(id);
        if (!deleted) {
            throw new Error(`Partnership with ID ${id} not found`);
        }
    }
};
exports.PartnershipService = PartnershipService;
exports.PartnershipService = PartnershipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [partnership_repository_1.PartnershipRepository])
], PartnershipService);
//# sourceMappingURL=partnership.service.js.map