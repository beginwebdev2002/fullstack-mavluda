import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { BookingRepository } from '../infrastructure/repositories/booking.repository';
import { Booking } from '../domain/booking.entity';
import { CreateBookingDto } from '../presentation/dto/create-booking.dto';
import { UpdateBookingDto } from '../presentation/dto/update-booking.dto';

describe('BookingService', () => {
  let service: BookingService;
  let repository: BookingRepository;

  const mockBookingRepository = {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockBooking = new Booking(
    '60d5f5070000000000000000',
    'John Doe',
    new Date(),
    'pending',
    new Date(),
    new Date(),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: BookingRepository,
          useValue: mockBookingRepository,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    repository = module.get<BookingRepository>(BookingRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of bookings', async () => {
      const result = [mockBooking];
      mockBookingRepository.findAll.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new booking with pending status', async () => {
      const createDto: CreateBookingDto = {
        customerName: 'John Doe',
        date: new Date(),
      };
      mockBookingRepository.create.mockResolvedValue(mockBooking);

      expect(await service.create(createDto)).toBe(mockBooking);
      expect(repository.create).toHaveBeenCalledWith({
        ...createDto,
        status: 'pending',
      });
    });
  });

  describe('findOne', () => {
    it('should return a booking if found', async () => {
      mockBookingRepository.findById.mockResolvedValue(mockBooking);

      expect(await service.findOne('1')).toBe(mockBooking);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if booking not found', async () => {
      mockBookingRepository.findById.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(
        'Booking with ID 1 not found',
      );
    });
  });

  describe('update', () => {
    it('should return updated booking if successful', async () => {
      const updateDto: UpdateBookingDto = { customerName: 'Jane Doe' };
      const updatedBooking = { ...mockBooking, customerName: 'Jane Doe' };
      mockBookingRepository.update.mockResolvedValue(updatedBooking);

      expect(await service.update('1', updateDto)).toBe(updatedBooking);
      expect(repository.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('should throw an error if booking not found', async () => {
      mockBookingRepository.update.mockResolvedValue(null);

      await expect(service.update('1', {})).rejects.toThrow(
        'Booking with ID 1 not found',
      );
    });
  });

  describe('remove', () => {
    it('should delete booking if found', async () => {
      mockBookingRepository.delete.mockResolvedValue(true);

      await expect(service.remove('1')).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if booking not found', async () => {
      mockBookingRepository.delete.mockResolvedValue(false);

      await expect(service.remove('1')).rejects.toThrow(
        'Booking with ID 1 not found',
      );
    });
  });
});
