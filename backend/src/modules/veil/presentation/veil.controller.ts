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
import { VeilService } from '../application/veil.service';
import { Veil } from '../domain/veil.entity';
import { CreateVeilDto } from './dto/create-veil.dto';
import { UpdateVeilDto } from './dto/update-veil.dto';

@Controller('veils')
export class VeilController {
  constructor(private readonly veilService: VeilService) {}

  @Get('count')
  async count(): Promise<number> {
    try {
      return await this.veilService.count();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get()
  async findAll(): Promise<Veil[]> {
    try {
      return await this.veilService.findAll();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get('available')
  async getAvailable(): Promise<Veil[]> {
    try {
      return await this.veilService.getAvailable();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Veil> {
    try {
      return await this.veilService.findOne(id);
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
    try {
      const imagePath =
        files && files.length > 0
          ? `/uploads/veils/${files[0].filename}`
          : null;

      const veilData = {
        ...createVeilDto,
        image: imagePath || createVeilDto.image,
      };
      const veil = veilData as unknown as Omit<Veil, 'id' | 'createdAt'>;
      return await this.veilService.create(veil);
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
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
    try {
      const imagePath =
        files && files.length > 0
          ? `/uploads/veils/${files[0].filename}`
          : null;

      const veilData = {
        ...updateVeilDto,
      };

      if (imagePath) {
        veilData.image = imagePath;
      }

      return await this.veilService.update(
        id,
        veilData as unknown as Partial<Veil>,
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
      return await this.veilService.remove(id);
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
