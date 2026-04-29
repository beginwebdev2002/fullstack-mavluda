import { GalleryService } from '../application/gallery.service';
import { Gallery } from '../domain/gallery.entity';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    count(): Promise<number>;
    findAll(): Promise<Gallery[]>;
    findOne(id: string): Promise<Gallery>;
    create(createGalleryDto: CreateGalleryDto, files: Array<Express.Multer.File>): Promise<Gallery>;
    update(id: string, updateGalleryDto: UpdateGalleryDto, files: Array<Express.Multer.File>): Promise<Gallery>;
    remove(id: string): Promise<void>;
}
