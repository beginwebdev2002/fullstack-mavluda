import { BookingService } from '../application/booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(createBookingDto: CreateBookingDto): Promise<import("..").Booking>;
    findAll(): Promise<import("..").Booking[]>;
    findOne(id: string): Promise<import("..").Booking>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<import("..").Booking>;
    remove(id: string): Promise<void>;
}
