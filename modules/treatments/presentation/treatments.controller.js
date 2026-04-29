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
exports.TreatmentsController = void 0;
const treatments_1 = require("..");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let TreatmentsController = class TreatmentsController {
    treatmentsService;
    constructor(treatmentsService) {
        this.treatmentsService = treatmentsService;
    }
    async count() {
        try {
            return await this.treatmentsService.count();
        }
        catch {
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async findAll() {
        try {
            return await this.treatmentsService.findAll();
        }
        catch {
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async findOne(id) {
        try {
            return await this.treatmentsService.findOne(id);
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('not found')) {
                throw new common_1.NotFoundException('NOT_FOUND');
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async create(createTreatmentDto, files) {
        try {
            const imagePath = files && files.length > 0
                ? `/uploads/treatments/${files[0].filename}`
                : '';
            if (imagePath) {
                createTreatmentDto.imageUrl = imagePath;
            }
            return await this.treatmentsService.create(createTreatmentDto);
        }
        catch {
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async update(id, updateTreatmentDto, files) {
        try {
            const imagePath = files && files.length > 0
                ? `/uploads/treatments/${files[0].filename}`
                : null;
            if (imagePath) {
                updateTreatmentDto.imageUrl = imagePath;
            }
            return await this.treatmentsService.update(id, updateTreatmentDto);
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
            return await this.treatmentsService.remove(id);
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
exports.TreatmentsController = TreatmentsController;
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TreatmentsController.prototype, "count", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TreatmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TreatmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/treatments',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [treatments_1.CreateServiceDto,
        Array]),
    __metadata("design:returntype", Promise)
], TreatmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/treatments',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, treatments_1.UpdateServiceDto,
        Array]),
    __metadata("design:returntype", Promise)
], TreatmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TreatmentsController.prototype, "remove", null);
exports.TreatmentsController = TreatmentsController = __decorate([
    (0, common_1.Controller)('treatments'),
    __metadata("design:paramtypes", [treatments_1.TreatmentsService])
], TreatmentsController);
//# sourceMappingURL=treatments.controller.js.map