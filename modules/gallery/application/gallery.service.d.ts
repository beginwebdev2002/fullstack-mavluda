import { Gallery } from '../domain/gallery.entity';
import { GalleryRepository } from '../infrastructure/repositories/gallery.repository';
export declare class GalleryService {
    private readonly galleryRepository;
    constructor(galleryRepository: GalleryRepository);
    count(): Promise<number>;
    findAll(): Promise<Gallery[]>;
    create(gallery: Omit<Gallery, 'id' | 'createdAt'>): Promise<Gallery>;
    findOne(id: string): Promise<Gallery>;
    update(id: string, updateGalleryDto: Partial<Gallery>): Promise<Gallery>;
    remove(id: string): Promise<void>;
}
