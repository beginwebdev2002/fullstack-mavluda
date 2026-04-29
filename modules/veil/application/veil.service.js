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
exports.VeilService = void 0;
const common_1 = require("@nestjs/common");
const veil_repository_1 = require("../infrastructure/repositories/veil.repository");
let VeilService = class VeilService {
    veilRepository;
    constructor(veilRepository) {
        this.veilRepository = veilRepository;
    }
    async count() {
        return this.veilRepository.count();
    }
    async findAll() {
        return this.veilRepository.findAll();
    }
    async getAvailable() {
        return this.veilRepository.findAvailable();
    }
    async create(veil) {
        return this.veilRepository.create(veil);
    }
    async findOne(id) {
        const veil = await this.veilRepository.findById(id);
        if (!veil) {
            throw new Error(`Veil with ID ${id} not found`);
        }
        return veil;
    }
    async update(id, updateVeilDto) {
        const updated = await this.veilRepository.update(id, updateVeilDto);
        if (!updated) {
            throw new Error(`Veil with ID ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.veilRepository.delete(id);
        if (!deleted) {
            throw new Error(`Veil with ID ${id} not found`);
        }
    }
};
exports.VeilService = VeilService;
exports.VeilService = VeilService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [veil_repository_1.VeilRepository])
], VeilService);
//# sourceMappingURL=veil.service.js.map