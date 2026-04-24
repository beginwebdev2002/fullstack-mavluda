import {
  CreateServiceDto as CreateTreatmentDto,
  Treatments,
  TreatmentsService,
  UpdateServiceDto as UpdateTreatmentDto,
} from '@modules/treatments';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Get('count')
  async count(): Promise<number> {
    try {
      return await this.treatmentsService.count();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get()
  async findAll(): Promise<Treatments[]> {
    try {
      return await this.treatmentsService.findAll();
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Treatments> {
    try {
      return await this.treatmentsService.findOne(id);
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
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads/treatments',
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
    @Body() createTreatmentDto: CreateTreatmentDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    try {
      const imagePath =
        files && files.length > 0
          ? `/uploads/treatments/${files[0].filename}`
          : '';
      if (imagePath) {
        createTreatmentDto.imageUrl = imagePath;
      }
      return await this.treatmentsService.create(
        createTreatmentDto as unknown as Omit<Treatments, 'id' | 'createdAt'>,
      );
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads/treatments',
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
    @Body() updateTreatmentDto: UpdateTreatmentDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Treatments> {
    try {
      const imagePath =
        files && files.length > 0
          ? `/uploads/treatments/${files[0].filename}`
          : null;

      if (imagePath) {
        updateTreatmentDto.imageUrl = imagePath;
      }

      return await this.treatmentsService.update(
        id,
        updateTreatmentDto as unknown as Partial<Treatments>,
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
      return await this.treatmentsService.remove(id);
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
