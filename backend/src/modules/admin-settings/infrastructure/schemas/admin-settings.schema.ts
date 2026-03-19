import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminSettingsDocument = HydratedDocument<AdminSettingsSchemaEntity>;

@Schema({ collection: 'admin_settings', timestamps: true })
export class AdminSettingsSchemaEntity {
  @Prop({ type: String, default: process.env.SETTINGS_ID })
  _id: string;

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

  @Prop({ type: [String], default: [] })
  galleryCategories: string[];

  @Prop({ type: [String], default: [] })
  treatmentCategories: string[];

  @Prop({ type: [String], default: [] })
  veilSilhouettes: string[];

  @Prop({ type: [String], default: [] })
  veilFabrics: string[];

  @Prop({ type: [String], default: [] })
  veilTrainLengths: string[];

  @Prop({ type: [String], default: [] })
  veilNecklines: string[];
}

export const AdminSettingsSchema = SchemaFactory.createForClass(
  AdminSettingsSchemaEntity,
);
