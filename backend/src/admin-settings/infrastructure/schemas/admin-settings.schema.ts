import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminSettingsDocument = HydratedDocument<AdminSettingsSchemaEntity>;

@Schema({ collection: 'admin_settings', timestamps: true })
export class AdminSettingsSchemaEntity {
  @Prop({ type: Object, required: true })
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };

  @Prop({ type: Map, of: String, default: {} })
  socialLinks: Map<string, string>;

  @Prop({ type: Map, of: String, default: {} })
  workHours: Map<string, string>;

  @Prop({ type: Object, required: true })
  ownerInfo: {
    name: string;
    phoneNumber: string;
  };
}

export const AdminSettingsSchema = SchemaFactory.createForClass(
  AdminSettingsSchemaEntity,
);
