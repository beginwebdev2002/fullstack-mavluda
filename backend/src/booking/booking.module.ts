import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './application/booking.service';
import { BookingController } from './presentation/booking.controller';
import { BookingRepository } from './infrastructure/repositories/booking.repository';
import { BookingSchema, BookingSchemaEntity } from './infrastructure/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookingSchemaEntity.name, schema: BookingSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
  exports: [BookingService],
})
export class BookingModule {}
