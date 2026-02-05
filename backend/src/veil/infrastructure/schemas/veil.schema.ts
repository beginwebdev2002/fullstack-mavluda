import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VeilDocument = HydratedDocument<VeilSchemaEntity>;

@Schema({ collection: 'veils', timestamps: true })
export class VeilSchemaEntity {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  rentalPrice: number;

  @Prop([String])
  images: string[];

  @Prop({ required: true })
  category: string;

  @Prop({ default: true })
  isAvailable: boolean;
}

export const VeilSchema = SchemaFactory.createForClass(VeilSchemaEntity);
