import { Injectable, Logger } from '@nestjs/common';
import { PaymentStrategy, InitiatePaymentDto, PaymentResult, PaymentCallbackData } from './payment.strategy';

@Injectable()
export class MockCardStrategy implements PaymentStrategy {
  name = 'card';
  private readonly logger = new Logger(MockCardStrategy.name);

  async initiatePayment(dto: InitiatePaymentDto): Promise<PaymentResult> {
    this.logger.log(`Initiating Mock Card Payment for order ${dto.orderId}`);
    
    return {
      success: true,
      transactionId: `card_${Date.now()}`,
      message: 'Mock Card Payment Successful'
    };
  }

  async validateCallback(data: PaymentCallbackData): Promise<PaymentResult> {
    return {
      success: true,
      message: 'Mock callback validated'
    };
  }
}
