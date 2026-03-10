import { Injectable, Logger } from '@nestjs/common';
import {
  PaymentStrategy,
  InitiatePaymentDto,
  PaymentResult,
  PaymentCallbackData,
} from './payment.strategy';

@Injectable()
export class AlifPayStrategy implements PaymentStrategy {
  name = 'alif-pay';
  private readonly logger = new Logger(AlifPayStrategy.name);

  async initiatePayment(dto: InitiatePaymentDto): Promise<PaymentResult> {
    this.logger.log(`Initiating Alif Pay for order ${dto.orderId}`);

    return {
      success: true,
      transactionId: `alif_${Date.now()}`,
      redirectUrl: `https://alifpay.mock/checkout?order=${dto.orderId}`,
      message: 'Payment initiated via Alif Pay',
    };
  }

  async validateCallback(data: PaymentCallbackData): Promise<PaymentResult> {
    this.logger.log('Validating Alif Pay callback', data);
    return {
      success: true,
      transactionId: data.transactionId as string,
      message: 'Callback validated',
    };
  }
}
