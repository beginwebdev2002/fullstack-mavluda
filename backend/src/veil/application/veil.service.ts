import { Injectable } from '@nestjs/common';
import { Veil } from '@veil/domain/veil.entity';
import { VeilRepository } from '@veil/infrastructure/repositories/veil.repository';

@Injectable()
export class VeilService {
  constructor(private readonly veilRepository: VeilRepository) {}

  async findAll(): Promise<Veil[]> {
    return this.veilRepository.findAll();
  }

  async getAvailable(): Promise<Veil[]> {
    return this.veilRepository.findAvailable();
  }

  async create(veil: Omit<Veil, 'id' | 'createdAt'>): Promise<Veil> {
    return this.veilRepository.create(veil);
  }
}
