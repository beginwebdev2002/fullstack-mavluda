export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  redirectUrl?: string;
  message?: string;
  raw?: any;
}

export interface InitiatePaymentDto {
  amount: number;
  currency: string;
  orderId: string;
  description?: string;
  customerPhone?: string;
}

export interface PaymentStrategy {
  name: string;
  initiatePayment(dto: InitiatePaymentDto): Promise<PaymentResult>;
  validateCallback(data: any): Promise<PaymentResult>;
}
