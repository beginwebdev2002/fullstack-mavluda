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
  NotFoundException,
  InternalServerErrorException,
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

  @Get('count')
  async count(): Promise<number> {
    try {
      return await this.galleryService.count();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get()
  async findAll(): Promise<Gallery[]> {
    try {
      return await this.galleryService.findAll();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Gallery> {
    try {
      return await this.galleryService.findOne(id);
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
    try {
      const imagePath =
        files && files.length > 0
          ? `/uploads/gallery/${files[0].filename}`
          : null;

      const galleryData = {
        ...createGalleryDto,
        imageUrl: imagePath || (createGalleryDto as any).imageUrl,
      };

      // Mapping DTO to Domain Entity
      const gallery = galleryData as unknown as Omit<
        Gallery,
        'id' | 'createdAt'
      >;
      return await this.galleryService.create(gallery);
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
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
    try {
      const imagePath =
        files && files.length > 0
          ? `/uploads/gallery/${files[0].filename}`
          : null;

      if (imagePath) {
        updateGalleryDto.imageUrl = imagePath;
      }

      return await this.galleryService.update(
        id,
        updateGalleryDto as unknown as Partial<Gallery>,
      );
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
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.galleryService.remove(id);
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
