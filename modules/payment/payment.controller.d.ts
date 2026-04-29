import { PaymentService } from './payment.service';
import type { InitiatePaymentDto } from './strategies/payment.strategy';
import { PaymentResult } from './strategies/payment.strategy';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    initiate(provider: string, dto: InitiatePaymentDto): Promise<PaymentResult>;
    callback(provider: string, body: Record<string, unknown>, query: Record<string, unknown>): Promise<PaymentResult>;
}
