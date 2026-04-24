import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BookingService } from '../application/booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    try {
      return await this.bookingService.create(createBookingDto);
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.bookingService.findAll();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.bookingService.findOne(id);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('NOT_FOUND');
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    try {
      return await this.bookingService.update(id, updateBookingDto);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('NOT_FOUND');
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.bookingService.remove(id);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('NOT_FOUND');
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }
}
