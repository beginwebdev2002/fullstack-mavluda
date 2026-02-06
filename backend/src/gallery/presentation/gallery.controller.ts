import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { GalleryService } from '../application/gallery.service';
import { Gallery } from '../domain/gallery.entity';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async findAll(): Promise<Gallery[]> {
    return this.galleryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Gallery> {
    return this.galleryService.findOne(id);
  }

  @Post()
  async create(@Body() createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    // Mapping DTO to Domain Entity
    const gallery = createGalleryDto as unknown as Omit<
      Gallery,
      'id' | 'createdAt'
    >;
    return this.galleryService.create(gallery);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ): Promise<Gallery> {
    return this.galleryService.update(
      id,
      updateGalleryDto as unknown as Partial<Gallery>,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.galleryService.remove(id);
  }
}
