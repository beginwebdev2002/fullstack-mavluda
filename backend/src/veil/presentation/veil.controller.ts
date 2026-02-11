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
import { VeilService } from '../application/veil.service';
import { Veil } from '../domain/veil.entity';
import { CreateVeilDto } from './dto/create-veil.dto';
import { UpdateVeilDto } from './dto/update-veil.dto';

@Controller('veils')
export class VeilController {
  constructor(private readonly veilService: VeilService) {}

  @Get()
  async findAll(): Promise<Veil[]> {
    return this.veilService.findAll();
  }

  @Get('available')
  async getAvailable(): Promise<Veil[]> {
    return this.veilService.getAvailable();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Veil> {
    return this.veilService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/veils',
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
    @Body() createVeilDto: CreateVeilDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Veil> {
    const imagePaths = files
      ? files.map((file) => `/uploads/veils/${file.filename}`)
      : [];
    const veilData = {
      ...createVeilDto,
      images: [
        ...(createVeilDto.images || []),
        ...imagePaths,
      ],
    };
      
    // The service expects Omit<Veil, 'id' | 'createdAt'>
    // We cast to unknown first because DTO might have optional fields that are required in Entity or vice versa, 
    // but effectively it matches.
    const veil = veilData as unknown as Omit<Veil, 'id' | 'createdAt'>;
    return this.veilService.create(veil);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/veils',
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
    @Body() updateVeilDto: UpdateVeilDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Veil> {
    const imagePaths = files
      ? files.map((file) => `/uploads/veils/${file.filename}`)
      : [];
    
    // Handle existing images. 
    // If updateVeilDto.images is a string (single file from FormData), make it array.
    // If it's already array, keep it.
    // If undefined, start with empty array.
    let existingImages: string[] = [];
    if (updateVeilDto.images) {
      if (Array.isArray(updateVeilDto.images)) {
        existingImages = updateVeilDto.images;
      } else {
        existingImages = [updateVeilDto.images];
      }
    }

    const veilData = {
      ...updateVeilDto,
      images: [...existingImages, ...imagePaths],
    };

    return this.veilService.update(
      id,
      veilData as unknown as Partial<Veil>,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.veilService.remove(id);
  }
}
