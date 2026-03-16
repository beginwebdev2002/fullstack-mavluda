import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/gallery',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Gallery> {
    const imagePath =
      files && files.length > 0
        ? `/uploads/gallery/${files[0].filename}`
        : null;

    const galleryData = {
      ...createGalleryDto,
      imageUrl: imagePath || (createGalleryDto as any).imageUrl,
    };

    // Mapping DTO to Domain Entity
    const gallery = galleryData as unknown as Omit<Gallery, 'id' | 'createdAt'>;
    return this.galleryService.create(gallery);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/gallery',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Gallery> {
    const imagePath =
      files && files.length > 0
        ? `/uploads/gallery/${files[0].filename}`
        : null;

    if (imagePath) {
      updateGalleryDto.imageUrl = imagePath;
    }

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
