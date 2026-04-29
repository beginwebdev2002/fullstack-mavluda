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
exports.PartnershipController = void 0;
const common_1 = require("@nestjs/common");
const partnership_service_1 = require("../application/partnership.service");
const create_partnership_dto_1 = require("./dto/create-partnership.dto");
const update_partnership_dto_1 = require("./dto/update-partnership.dto");
let PartnershipController = class PartnershipController {
    partnershipService;
    constructor(partnershipService) {
        this.partnershipService = partnershipService;
    }
    async create(createPartnershipDto) {
        try {
            return await this.partnershipService.create(createPartnershipDto);
        }
        catch {
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async findAll() {
        try {
            return await this.partnershipService.findAll();
        }
        catch {
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async findOne(id) {
        try {
            return await this.partnershipService.findOne(id);
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('not found')) {
                throw new common_1.NotFoundException('NOT_FOUND');
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async update(id, updatePartnershipDto) {
        try {
            return await this.partnershipService.update(id, updatePartnershipDto);
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('not found')) {
                throw new common_1.NotFoundException('NOT_FOUND');
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async remove(id) {
        try {
            return await this.partnershipService.remove(id);
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('not found')) {
                throw new common_1.NotFoundException('NOT_FOUND');
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
};
exports.PartnershipController = PartnershipController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partnership_dto_1.CreatePartnershipDto]),
    __metadata("design:returntype", Promise)
], PartnershipController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PartnershipController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnershipController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_partnership_dto_1.UpdatePartnershipDto]),
    __metadata("design:returntype", Promise)
], PartnershipController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnershipController.prototype, "remove", null);
exports.PartnershipController = PartnershipController = __decorate([
    (0, common_1.Controller)('partnerships'),
    __metadata("design:paramtypes", [partnership_service_1.PartnershipService])
], PartnershipController);
//# sourceMappingURL=partnership.controller.js.map