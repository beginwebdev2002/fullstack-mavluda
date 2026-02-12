import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookingDocument = HydratedDocument<BookingSchemaEntity>;

@Schema({ collection: 'bookings', timestamps: true })
export class BookingSchemaEntity {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 'pending' })
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(BookingSchemaEntity);
