import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<ServiceSchemaEntity>;

@Schema({ collection: 'services', timestamps: true })
export class ServiceSchemaEntity {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  durationMinutes: number;

  @Prop({ required: true, enum: ['medical', 'beauty'] })
  category: string;
}

export const ServiceSchema = SchemaFactory.createForClass(ServiceSchemaEntity);
