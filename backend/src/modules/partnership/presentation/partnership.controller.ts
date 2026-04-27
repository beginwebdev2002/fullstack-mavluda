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
import { PartnershipService } from '../application/partnership.service';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';

@Controller('partnerships')
export class PartnershipController {
  constructor(private readonly partnershipService: PartnershipService) {}

  @Post()
  async create(@Body() createPartnershipDto: CreatePartnershipDto) {
    try {
      return await this.partnershipService.create(createPartnershipDto);
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.partnershipService.findAll();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.partnershipService.findOne(id);
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
    @Body() updatePartnershipDto: UpdatePartnershipDto,
  ) {
    try {
      return await this.partnershipService.update(id, updatePartnershipDto);
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
      return await this.partnershipService.remove(id);
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
