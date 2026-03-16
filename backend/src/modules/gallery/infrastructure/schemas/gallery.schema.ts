import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GalleryDocument = HydratedDocument<GallerySchemaEntity>;

@Schema({ collection: 'gallery', timestamps: true })
export class GallerySchemaEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  category: string;

  @Prop({ default: 'draft' })
  status: string;

  @Prop()
  alt: string;

}

export const GallerySchema = SchemaFactory.createForClass(GallerySchemaEntity);
