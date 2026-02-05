import { Injectable, Logger } from '@nestjs/common';
import { PaymentStrategy, InitiatePaymentDto, PaymentResult } from './payment.strategy';

@Injectable()
export class AlifPayStrategy implements PaymentStrategy {
  name = 'alif-pay';
  private readonly logger = new Logger(AlifPayStrategy.name);

  async initiatePayment(dto: InitiatePaymentDto): Promise<PaymentResult> {
    this.logger.log(`Initiating Alif Pay for order ${dto.orderId}`);
    // MOCK IMPLEMENTATION for Phase 5
    // Real implementation would invoke Alif Pay API here
    
    return {
      success: true,
      transactionId: `alif_${Date.now()}`,
      redirectUrl: `https://alifpay.mock/checkout?order=${dto.orderId}`,
      message: 'Payment initiated via Alif Pay'
    };
  }

  async validateCallback(data: any): Promise<PaymentResult> {
    this.logger.log('Validating Alif Pay callback', data);
    return {
      success: true,
      transactionId: data.transactionId,
      message: 'Callback validated'
    };
  }
}
