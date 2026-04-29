import { Booking } from '../domain/booking.entity';
import { BookingRepository } from '../infrastructure/repositories/booking.repository';
import { CreateBookingDto } from '../presentation/dto/create-booking.dto';
import { UpdateBookingDto } from '../presentation/dto/update-booking.dto';
export declare class BookingService {
    private readonly bookingRepository;
    constructor(bookingRepository: BookingRepository);
    findAll(): Promise<Booking[]>;
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findOne(id: string): Promise<Booking>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking>;
    remove(id: string): Promise<void>;
}
