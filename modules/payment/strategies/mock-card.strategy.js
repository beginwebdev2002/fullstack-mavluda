"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MockCardStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCardStrategy = void 0;
const common_1 = require("@nestjs/common");
let MockCardStrategy = MockCardStrategy_1 = class MockCardStrategy {
    name = 'card';
    logger = new common_1.Logger(MockCardStrategy_1.name);
    async initiatePayment(dto) {
        this.logger.log(`Initiating Mock Card Payment for order ${dto.orderId}`);
        return {
            success: true,
            transactionId: `card_${Date.now()}`,
            message: 'Mock Card Payment Successful',
        };
    }
    async validateCallback(data) {
        return {
            success: true,
            message: 'Mock callback validated',
        };
    }
};
exports.MockCardStrategy = MockCardStrategy;
exports.MockCardStrategy = MockCardStrategy = MockCardStrategy_1 = __decorate([
    (0, common_1.Injectable)()
], MockCardStrategy);
//# sourceMappingURL=mock-card.strategy.js.map