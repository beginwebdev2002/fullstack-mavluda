import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InventoryDocument = HydratedDocument<InventorySchemaEntity>;

@Schema({ collection: 'inventory', timestamps: true })
export class InventorySchemaEntity {
  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop()
  location: string;
}

export const InventorySchema = SchemaFactory.createForClass(
  InventorySchemaEntity,
);
