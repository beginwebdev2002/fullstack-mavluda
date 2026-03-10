import { Injectable } from '@nestjs/common';
import { Gallery } from '@modules/gallery';
import { GalleryRepository } from '@modules/gallery';

@Injectable()
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  async findAll(): Promise<Gallery[]> {
    return this.galleryRepository.findAll();
  }

  async create(gallery: Omit<Gallery, 'id' | 'createdAt'>): Promise<Gallery> {
    return this.galleryRepository.create(gallery);
  }
  async findOne(id: string): Promise<Gallery> {
    const gallery = await this.galleryRepository.findById(id);
    if (!gallery) {
      throw new Error(`Gallery item with ID ${id} not found`);
    }
    return gallery;
  }

  async update(
    id: string,
    updateGalleryDto: Partial<Gallery>,
  ): Promise<Gallery> {
    const updated = await this.galleryRepository.update(id, updateGalleryDto);
    if (!updated) {
      throw new Error(`Gallery item with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.galleryRepository.delete(id);
    if (!deleted) {
      throw new Error(`Gallery item with ID ${id} not found`);
    }
  }
}
