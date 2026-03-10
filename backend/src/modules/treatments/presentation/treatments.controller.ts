import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TreatmentsService } from '@modules/treatments';
import { Treatments } from '@modules/treatments';
import { CreateServiceDto } from '@modules/treatments';
import { UpdateServiceDto } from '@modules/treatments';

@Controller('services')
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
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<Treatments> {
    const service = createServiceDto as unknown as Omit<
      Treatments,
      'id' | 'createdAt'
    >;
    return this.treatmentsService.create(service);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Treatments> {
    return this.treatmentsService.update(
      id,
      updateServiceDto as unknown as Partial<Treatments>,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.treatmentsService.remove(id);
  }
}
