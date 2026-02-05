import { Controller, Get, Post, Body } from '@nestjs/common';
import { GalleryService } from '../application/gallery.service';
import { Gallery } from '../domain/gallery.entity';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async findAll(): Promise<Gallery[]> {
    return this.galleryService.findAll();
  }

  @Post()
  async create(@Body() gallery: Omit<Gallery, 'id' | 'createdAt'>): Promise<Gallery> {
    return this.galleryService.create(gallery);
  }
}
