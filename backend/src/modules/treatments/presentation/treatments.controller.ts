import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Treatments')
@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @ApiOperation({ summary: 'Get all' }) @ApiResponse({ status: 200 })
  @Get()
  async findAll(): Promise<Treatments[]> {
    return this.treatmentsService.findAll();
  }

  @ApiOperation({ summary: 'Get one' }) @ApiResponse({ status: 200 })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Treatments> {
    return this.treatmentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create' }) @ApiResponse({ status: 201 })
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
    const imagePath =
      files && files.length > 0
        ? `/uploads/treatments/${files[0].filename}`
        : '';
    if (imagePath) {
      createTreatmentDto.imageUrl = imagePath;
    }
    return this.treatmentsService.create(
      createTreatmentDto as unknown as Omit<Treatments, 'id' | 'createdAt'>,
    );
  }

  @ApiOperation({ summary: 'Update' }) @ApiResponse({ status: 200 })
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
    const imagePath =
      files && files.length > 0
        ? `/uploads/treatments/${files[0].filename}`
        : null;

    if (imagePath) {
      updateTreatmentDto.imageUrl = imagePath;
    }

    return this.treatmentsService.update(
      id,
      updateTreatmentDto as unknown as Partial<Treatments>,
    );
  }

  @ApiOperation({ summary: 'Delete' }) @ApiResponse({ status: 200 })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.treatmentsService.remove(id);
  }
}
