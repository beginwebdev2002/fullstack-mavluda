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

  @Get('count')
  async count(): Promise<number> {
    return this.veilService.count();
  }

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
    const imagePath =
      files && files.length > 0 ? `/uploads/veils/${files[0].filename}` : null;

    const veilData = {
      ...createVeilDto,
      image: imagePath || createVeilDto.image,
    };
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
    const imagePath =
      files && files.length > 0 ? `/uploads/veils/${files[0].filename}` : null;

    const veilData = {
      ...updateVeilDto,
    };

    if (imagePath) {
      veilData.image = imagePath;
    }

    return this.veilService.update(id, veilData as unknown as Partial<Veil>);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.veilService.remove(id);
  }
}
