import { Model } from 'mongoose';
import { Booking } from '../../domain/booking.entity';
import { BookingDocument } from '../schemas/booking.schema';
export declare class BookingRepository {
    private readonly bookingModel;
    constructor(bookingModel: Model<BookingDocument>);
    findAll(): Promise<Booking[]>;
    create(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking>;
    findById(id: string): Promise<Booking | null>;
    update(id: string, updateData: Partial<Booking>): Promise<Booking | null>;
    delete(id: string): Promise<boolean>;
    private toDomain;
}
