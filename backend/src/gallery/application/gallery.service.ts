import { Injectable } from '@nestjs/common';
import { Gallery } from '@gallery/domain/gallery.entity';
import { GalleryRepository } from '@gallery/infrastructure/repositories/gallery.repository';

@Injectable()
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  async findAll(): Promise<Gallery[]> {
    return this.galleryRepository.findAll();
  }

  async create(gallery: Omit<Gallery, 'id' | 'createdAt'>): Promise<Gallery> {
    return this.galleryRepository.create(gallery);
  }
}
