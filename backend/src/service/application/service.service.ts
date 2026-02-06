import { Injectable } from '@nestjs/common';
import { Service } from '@services/domain/service.entity';
import { ServiceRepository } from '@services/infrastructure/repositories/service.repository';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.findAll();
  }

  async create(service: Omit<Service, 'id' | 'createdAt'>): Promise<Service> {
    return this.serviceRepository.create(service);
  }
  async findOne(id: string): Promise<Service> {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new Error(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(
    id: string,
    updateServiceDto: Partial<Service>,
  ): Promise<Service> {
    const updated = await this.serviceRepository.update(id, updateServiceDto);
    if (!updated) {
      throw new Error(`Service with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.serviceRepository.delete(id);
    if (!deleted) {
      throw new Error(`Service with ID ${id} not found`);
    }
  }
}
