import { InitiatePaymentDto, PaymentCallbackData, PaymentResult } from './strategies/payment.strategy';
import { AlifPayStrategy } from './strategies/alif-pay.strategy';
import { MockCardStrategy } from './strategies/mock-card.strategy';
export declare class PaymentService {
    private readonly alifPayStrategy;
    private readonly mockCardStrategy;
    private strategies;
    constructor(alifPayStrategy: AlifPayStrategy, mockCardStrategy: MockCardStrategy);
    private registerStrategy;
    initiatePayment(provider: string, dto: InitiatePaymentDto): Promise<PaymentResult>;
    handleCallback(provider: string, data: PaymentCallbackData): Promise<PaymentResult>;
}
