import { Controller, Get, Post, Body } from '@nestjs/common';
import { ServiceService } from '../application/service.service';
import { Service } from '../domain/service.entity';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Post()
  async create(@Body() service: Omit<Service, 'id' | 'createdAt'>): Promise<Service> {
    return this.serviceService.create(service);
  }
}
