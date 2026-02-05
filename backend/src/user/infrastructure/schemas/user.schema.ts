import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserSchemaEntity>;

@Schema({ collection: 'users', timestamps: true })
export class UserSchemaEntity {
  @Prop({ required: true, unique: true, index: true })
  telegramId: number;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  username: string;

  @Prop()
  photoUrl: string;

  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaEntity);
