import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { AlifPayStrategy } from './strategies/alif-pay.strategy';
import { MockCardStrategy } from './strategies/mock-card.strategy';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, AlifPayStrategy, MockCardStrategy],
  exports: [PaymentService],
})
export class PaymentModule {}
