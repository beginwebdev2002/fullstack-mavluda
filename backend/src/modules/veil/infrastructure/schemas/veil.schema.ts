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

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  category: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop()
  sku: string;

  @Prop()
  silhouette: string;

  @Prop()
  neckline: string;

  @Prop()
  fabric: string;

  @Prop()
  trainLength: string;

  @Prop()
  stock: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const VeilSchema = SchemaFactory.createForClass(VeilSchemaEntity);
