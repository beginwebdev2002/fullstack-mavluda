import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TreatmentsDocument = HydratedDocument<TreatmentsSchemaEntity>;

@Schema({ collection: 'treatments', timestamps: true })
export class TreatmentsSchemaEntity {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  category: string;

  @Prop()
  imageUrl: string;

  @Prop({ default: true })
  active: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TreatmentsSchema = SchemaFactory.createForClass(
  TreatmentsSchemaEntity,
);
