"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AlifPayStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlifPayStrategy = void 0;
const common_1 = require("@nestjs/common");
let AlifPayStrategy = AlifPayStrategy_1 = class AlifPayStrategy {
    name = 'alif-pay';
    logger = new common_1.Logger(AlifPayStrategy_1.name);
    initiatePayment(dto) {
        this.logger.log(`Initiating Alif Pay for order ${dto.orderId}`);
        return Promise.resolve({
            success: true,
            transactionId: `alif_${Date.now()}`,
            redirectUrl: `https://alifpay.mock/checkout?order=${dto.orderId}`,
            message: 'Payment initiated via Alif Pay',
        });
    }
    validateCallback(data) {
        this.logger.log('Validating Alif Pay callback', data);
        return Promise.resolve({
            success: true,
            transactionId: data.transactionId,
            message: 'Callback validated',
        });
    }
};
exports.AlifPayStrategy = AlifPayStrategy;
exports.AlifPayStrategy = AlifPayStrategy = AlifPayStrategy_1 = __decorate([
    (0, common_1.Injectable)()
], AlifPayStrategy);
//# sourceMappingURL=alif-pay.strategy.js.map