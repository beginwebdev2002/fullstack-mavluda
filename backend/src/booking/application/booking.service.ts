import { Injectable } from '@nestjs/common';
import { Booking } from '../domain/booking.entity';
import { BookingRepository } from '../infrastructure/repositories/booking.repository';
import { CreateBookingDto } from '../presentation/dto/create-booking.dto';
import { UpdateBookingDto } from '../presentation/dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.findAll();
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingRepository.create({
      ...createBookingDto,
      status: 'pending',
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      throw new Error(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const updated = await this.bookingRepository.update(id, updateBookingDto);
    if (!updated) {
      throw new Error(`Booking with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.bookingRepository.delete(id);
    if (!deleted) {
      throw new Error(`Booking with ID ${id} not found`);
    }
  }
}
