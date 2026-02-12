import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnershipService } from './application/partnership.service';
import { PartnershipController } from './presentation/partnership.controller';
import { PartnershipRepository } from './infrastructure/repositories/partnership.repository';
import { PartnershipSchema, PartnershipSchemaEntity } from './infrastructure/schemas/partnership.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PartnershipSchemaEntity.name, schema: PartnershipSchema },
    ]),
  ],
  controllers: [PartnershipController],
  providers: [PartnershipService, PartnershipRepository],
  exports: [PartnershipService],
})
export class PartnershipModule {}
