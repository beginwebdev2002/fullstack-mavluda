import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { TreatmentsService } from '@modules/treatments';
import { Treatments } from '@modules/treatments';
import { CreateServiceDto as CreateTreatmentDto } from '@modules/treatments';
import { UpdateServiceDto as UpdateTreatmentDto } from '@modules/treatments';
import { title } from 'process';

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Get()
  async findAll(): Promise<Treatments[]> {
    return this.treatmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Treatments> {
    return this.treatmentsService.findOne(id);
  }

  @Post()
  async create(
    @Body() createTreatmentDto: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    console.log('Create Treatments');
    console.log(createTreatmentDto);

    const treatment = createTreatmentDto as unknown as Omit<
      Treatments,
      'id' | 'createdAt'
    >;
    return { title: 'string' };
    return this.treatmentsService.create(treatment);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ): Promise<Treatments> {
    return this.treatmentsService.update(
      id,
      updateTreatmentDto as unknown as Partial<Treatments>,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.treatmentsService.remove(id);
  }
}
