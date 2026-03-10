import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreatmentsService } from '@modules/treatments/application/treatments.service';
import { TreatmentsController } from '@modules/treatments/presentation/treatments.controller';
import { TreatmentsRepository } from '@modules/treatments/infrastructure/repositories/treatments.repository';
import {
  TreatmentsSchema,
  TreatmentsSchemaEntity,
} from '@modules/treatments/infrastructure/schemas/treatments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TreatmentsSchemaEntity.name, schema: TreatmentsSchema },
    ]),
  ],
  controllers: [TreatmentsController],
  providers: [TreatmentsService, TreatmentsRepository],
  exports: [TreatmentsService],
})
export class TreatmentsModule {}
