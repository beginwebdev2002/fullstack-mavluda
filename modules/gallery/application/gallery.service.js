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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const gallery_repository_1 = require("../infrastructure/repositories/gallery.repository");
let GalleryService = class GalleryService {
    galleryRepository;
    constructor(galleryRepository) {
        this.galleryRepository = galleryRepository;
    }
    async count() {
        return this.galleryRepository.count();
    }
    async findAll() {
        return this.galleryRepository.findAll();
    }
    async create(gallery) {
        return this.galleryRepository.create(gallery);
    }
    async findOne(id) {
        const gallery = await this.galleryRepository.findById(id);
        if (!gallery) {
            throw new Error(`Gallery item with ID ${id} not found`);
        }
        return gallery;
    }
    async update(id, updateGalleryDto) {
        const updated = await this.galleryRepository.update(id, updateGalleryDto);
        if (!updated) {
            throw new Error(`Gallery item with ID ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.galleryRepository.delete(id);
        if (!deleted) {
            throw new Error(`Gallery item with ID ${id} not found`);
        }
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gallery_repository_1.GalleryRepository])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map