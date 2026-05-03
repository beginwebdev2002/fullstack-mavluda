import { Injectable, Logger } from '@nestjs/common';
import {
  PaymentStrategy,
  InitiatePaymentDto,
  PaymentResult,
  PaymentCallbackData,
} from './payment.strategy';

@Injectable()
export class MockCardStrategy implements PaymentStrategy {
  name = 'card';
  private readonly logger = new Logger(MockCardStrategy.name);

  initiatePayment(dto: InitiatePaymentDto): Promise<PaymentResult> {
    this.logger.log(`Initiating Mock Card Payment for order ${dto.orderId}`);

    return Promise.resolve({
      success: true,
      transactionId: `card_${Date.now()}`,
      message: 'Mock Card Payment Successful',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateCallback(_data: PaymentCallbackData): Promise<PaymentResult> {
    return Promise.resolve({
      success: true,
      message: 'Mock callback validated',
    });
  }
}
