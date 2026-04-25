import {
  Controller,
  Post,
  Body,
  Param,
  Query,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      return await this.paymentService.initiatePayment(provider, dto);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('NOT_FOUND');
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Post('callback/:provider')
  async callback(
    @Param('provider') provider: string,
    @Body() body: Record<string, unknown>,
    @Query() query: Record<string, unknown>,
  ): Promise<PaymentResult> {
    try {
      const data = { ...body, ...query };
      return await this.paymentService.handleCallback(provider, data);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('NOT_FOUND');
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }
}
