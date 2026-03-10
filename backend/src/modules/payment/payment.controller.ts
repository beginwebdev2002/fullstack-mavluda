import { Controller, Post, Body, Param, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import type { InitiatePaymentDto } from './strategies/payment.strategy';

import { PaymentResult } from './strategies/payment.strategy';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate/:provider')
  async initiate(
    @Param('provider') provider: string,
    @Body() dto: InitiatePaymentDto,
  ): Promise<PaymentResult> {
    return this.paymentService.initiatePayment(provider, dto);
  }

  @Post('callback/:provider')
  async callback(
    @Param('provider') provider: string,
    @Body() body: Record<string, unknown>,
    @Query() query: Record<string, unknown>,
  ): Promise<PaymentResult> {
    const data = { ...body, ...query };
    return this.paymentService.handleCallback(provider, data);
  }
}
