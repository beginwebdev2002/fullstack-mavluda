import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryService } from './application/inventory.service';
import { InventoryController } from './presentation/inventory.controller';
import { InventoryRepository } from './infrastructure/repositories/inventory.repository';
import {
  InventorySchema,
  InventorySchemaEntity,
} from './infrastructure/schemas/inventory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InventorySchemaEntity.name, schema: InventorySchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
  exports: [InventoryService],
})
export class InventoryModule {}
