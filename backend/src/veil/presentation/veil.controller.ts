import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
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
  async create(@Body() createVeilDto: CreateVeilDto): Promise<Veil> {
    const veil = createVeilDto as unknown as Omit<Veil, 'id' | 'createdAt'>;
    return this.veilService.create(veil);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVeilDto: UpdateVeilDto,
  ): Promise<Veil> {
    return this.veilService.update(
      id,
      updateVeilDto as unknown as Partial<Veil>,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.veilService.remove(id);
  }
}
