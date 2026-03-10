import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserSchemaEntity>;

@Schema({ collection: 'users', timestamps: true })
export class UserSchemaEntity {
  @Prop({ required: false, unique: true, index: true, sparse: true })
  telegramId: number;

  @Prop({ required: false, unique: true, index: true, sparse: true })
  email: string;

  @Prop({ required: false })
  passwordHash: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  photoUrl: string;

  @Prop({ required: true, default: 'user', enum: ['user', 'admin'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaEntity);
