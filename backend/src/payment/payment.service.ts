import { Injectable, BadRequestException } from '@nestjs/common';
import { PaymentStrategy, InitiatePaymentDto, PaymentCallbackData } from './strategies/payment.strategy';
import { AlifPayStrategy } from './strategies/alif-pay.strategy';
import { MockCardStrategy } from './strategies/mock-card.strategy';

@Injectable()
export class PaymentService {
  private strategies: Map<string, PaymentStrategy> = new Map();

  constructor(
    private readonly alifPayStrategy: AlifPayStrategy,
    private readonly mockCardStrategy: MockCardStrategy,
  ) {
    this.registerStrategy(alifPayStrategy);
    this.registerStrategy(mockCardStrategy);
  }

  private registerStrategy(strategy: PaymentStrategy) {
    this.strategies.set(strategy.name, strategy);
  }

  async initiatePayment(provider: string, dto: InitiatePaymentDto) {
    const strategy = this.strategies.get(provider);
    if (!strategy) {
      throw new BadRequestException(`Payment provider ${provider} not supported`);
    }
    return strategy.initiatePayment(dto);
  }

  async handleCallback(provider: string, data: PaymentCallbackData) {
    const strategy = this.strategies.get(provider);
    if (!strategy) {
      throw new BadRequestException(`Payment provider ${provider} not supported`);
    }
    return strategy.validateCallback(data);
  }
}
