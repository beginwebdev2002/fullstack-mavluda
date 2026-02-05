import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VeilService } from './application/veil.service';
import { VeilRepository } from './infrastructure/repositories/veil.repository';
import {
  VeilSchema,
  VeilSchemaEntity,
} from './infrastructure/schemas/veil.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VeilSchemaEntity.name, schema: VeilSchema },
    ]),
  ],
  providers: [VeilService, VeilRepository],
  exports: [VeilService],
})
export class VeilModule {}
