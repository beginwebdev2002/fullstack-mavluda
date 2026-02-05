import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryService } from './application/gallery.service';
import { GalleryRepository } from './infrastructure/repositories/gallery.repository';
import {
  GallerySchema,
  GallerySchemaEntity,
} from './infrastructure/schemas/gallery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GallerySchemaEntity.name, schema: GallerySchema },
    ]),
  ],
  providers: [GalleryService, GalleryRepository],
  exports: [GalleryService],
})
export class GalleryModule {}
