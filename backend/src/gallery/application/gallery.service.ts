import { Injectable } from '@nestjs/common';
import { Gallery } from '../domain/gallery.entity';
import { GalleryRepository } from '../infrastructure/repositories/gallery.repository';

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
