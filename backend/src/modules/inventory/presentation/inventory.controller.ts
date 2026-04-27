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
import { InventoryService } from '../application/inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    try {
      return await this.inventoryService.create(createInventoryDto);
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.inventoryService.findAll();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.inventoryService.findOne(id);
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
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    try {
      return await this.inventoryService.update(id, updateInventoryDto);
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
      return await this.inventoryService.remove(id);
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
