import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceService } from './application/service.service';
import { ServiceRepository } from './infrastructure/repositories/service.repository';
import {
  ServiceSchema,
  ServiceSchemaEntity,
} from './infrastructure/schemas/service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceSchemaEntity.name, schema: ServiceSchema },
    ]),
  ],
  providers: [ServiceService, ServiceRepository],
  exports: [ServiceService],
})
export class ServiceModule {}
