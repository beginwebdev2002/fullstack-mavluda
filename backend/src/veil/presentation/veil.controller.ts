import { Controller, Get, Post, Body } from '@nestjs/common';
import { VeilService } from '../application/veil.service';
import { Veil } from '../domain/veil.entity';

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

  @Post()
  async create(@Body() veil: Omit<Veil, 'id' | 'createdAt'>): Promise<Veil> {
    return this.veilService.create(veil);
  }
}
