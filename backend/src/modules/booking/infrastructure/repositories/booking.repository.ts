import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from '../../domain/booking.entity';
import {
  BookingDocument,
  BookingSchemaEntity,
} from '../schemas/booking.schema';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(BookingSchemaEntity.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async findAll(): Promise<Booking[]> {
    const docs = await this.bookingModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async create(
    booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Booking> {
    const created = new this.bookingModel(booking);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<Booking | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    const doc = await this.bookingModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async update(
    id: string,
    updateData: Partial<Booking>,
  ): Promise<Booking | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }

    const safeUpdateData: Partial<
      Pick<Booking, 'customerName' | 'date' | 'status'>
    > = {};

    if (typeof updateData.customerName === 'string') {
      safeUpdateData.customerName = updateData.customerName;
    }

    if (
      updateData.date instanceof Date ||
      (typeof updateData.date === 'string' &&
        !Number.isNaN(Date.parse(updateData.date)))
    ) {
      safeUpdateData.date =
        updateData.date instanceof Date
          ? updateData.date
          : new Date(updateData.date);
    }

    if (
      updateData.status === 'pending' ||
      updateData.status === 'confirmed' ||
      updateData.status === 'cancelled'
    ) {
      safeUpdateData.status = updateData.status;
    }

    if (Object.keys(safeUpdateData).length === 0) {
      return this.findById(id);
    }

    const doc = await this.bookingModel
      .findByIdAndUpdate(id, { $set: safeUpdateData }, { new: true })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.bookingModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  private toDomain(doc: BookingDocument): Booking {
    const d = doc as unknown as {
      _id: { toString: () => string };
      customerName: string;
      date: Date;
      status: 'pending' | 'confirmed' | 'cancelled';
      createdAt: Date;
      updatedAt: Date;
    };
    return new Booking(
      d._id.toString(),
      d.customerName,
      d.date,
      d.status,
      d.createdAt,
      d.updatedAt,
    );
  }
}
