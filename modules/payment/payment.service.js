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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const alif_pay_strategy_1 = require("./strategies/alif-pay.strategy");
const mock_card_strategy_1 = require("./strategies/mock-card.strategy");
let PaymentService = class PaymentService {
    alifPayStrategy;
    mockCardStrategy;
    strategies = new Map();
    constructor(alifPayStrategy, mockCardStrategy) {
        this.alifPayStrategy = alifPayStrategy;
        this.mockCardStrategy = mockCardStrategy;
        this.registerStrategy(alifPayStrategy);
        this.registerStrategy(mockCardStrategy);
    }
    registerStrategy(strategy) {
        this.strategies.set(strategy.name, strategy);
    }
    async initiatePayment(provider, dto) {
        const strategy = this.strategies.get(provider);
        if (!strategy) {
            throw new common_1.BadRequestException(`Payment provider ${provider} not supported`);
        }
        return strategy.initiatePayment(dto);
    }
    async handleCallback(provider, data) {
        const strategy = this.strategies.get(provider);
        if (!strategy) {
            throw new common_1.BadRequestException(`Payment provider ${provider} not supported`);
        }
        return strategy.validateCallback(data);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [alif_pay_strategy_1.AlifPayStrategy,
        mock_card_strategy_1.MockCardStrategy])
], PaymentService);
//# sourceMappingURL=payment.service.js.map