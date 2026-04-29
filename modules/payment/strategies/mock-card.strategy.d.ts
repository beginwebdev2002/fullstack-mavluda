import { PaymentStrategy, InitiatePaymentDto, PaymentResult, PaymentCallbackData } from './payment.strategy';
export declare class MockCardStrategy implements PaymentStrategy {
    name: string;
    private readonly logger;
    initiatePayment(dto: InitiatePaymentDto): Promise<PaymentResult>;
    validateCallback(data: PaymentCallbackData): Promise<PaymentResult>;
}
