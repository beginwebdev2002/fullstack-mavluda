import { Model } from 'mongoose';
import { Gallery } from '../../domain/gallery.entity';
import { GalleryDocument } from '../schemas/gallery.schema';
export declare class GalleryRepository {
    private readonly galleryModel;
    constructor(galleryModel: Model<GalleryDocument>);
    count(): Promise<number>;
    findAll(): Promise<Gallery[]>;
    create(gallery: Omit<Gallery, 'id' | 'createdAt'>): Promise<Gallery>;
    findById(id: string): Promise<Gallery | null>;
    update(id: string, updateData: Partial<Gallery>): Promise<Gallery | null>;
    delete(id: string): Promise<boolean>;
    private toDomain;
}
