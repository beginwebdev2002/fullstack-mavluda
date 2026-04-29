export interface PaymentResult {
    success: boolean;
    transactionId?: string;
    redirectUrl?: string;
    message?: string;
    raw?: Record<string, unknown>;
}
export interface InitiatePaymentDto {
    amount: number;
    currency: string;
    orderId: string;
    description?: string;
    customerPhone?: string;
}
export interface PaymentCallbackData {
    transactionId?: string;
    orderId?: string;
    status?: string;
    [key: string]: unknown;
}
export interface PaymentStrategy {
    name: string;
    initiatePayment(dto: InitiatePaymentDto): Promise<PaymentResult>;
    validateCallback(data: PaymentCallbackData): Promise<PaymentResult>;
}
