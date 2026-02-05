import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceService } from './application/service.service';
import { ServiceController } from './presentation/service.controller';
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
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  exports: [ServiceService],
})
export class ServiceModule {}
