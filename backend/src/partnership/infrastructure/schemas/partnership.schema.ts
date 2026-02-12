import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartnershipDocument = HydratedDocument<PartnershipSchemaEntity>;

@Schema({ collection: 'partnerships', timestamps: true })
export class PartnershipSchemaEntity {
  @Prop({ required: true })
  partnerName: string;

  @Prop({ required: true })
  contactEmail: string;

  @Prop({ required: true })
  type: string;

  @Prop({ default: 'active' })
  status: string;
}

export const PartnershipSchema = SchemaFactory.createForClass(PartnershipSchemaEntity);
