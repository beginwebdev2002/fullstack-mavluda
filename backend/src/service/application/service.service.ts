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
}
