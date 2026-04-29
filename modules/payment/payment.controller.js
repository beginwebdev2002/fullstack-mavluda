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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async initiate(provider, dto) {
        try {
            return await this.paymentService.initiatePayment(provider, dto);
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.toLowerCase().includes('not found')) {
                throw new common_1.NotFoundException('NOT_FOUND');
            }
            throw new common_1.InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
    }
    async callback(provider, body, query) {
        try {
            const data = { ...body, ...query };
            return await this.paymentService.handleCallback(provider, data);
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
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('initiate/:provider'),
    __param(0, (0, common_1.Param)('provider')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initiate", null);
__decorate([
    (0, common_1.Post)('callback/:provider'),
    __param(0, (0, common_1.Param)('provider')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "callback", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map