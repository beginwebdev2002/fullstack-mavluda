import { Injectable } from '@nestjs/common';
import { Veil } from '@modules/veil';
import { VeilRepository } from '@modules/veil';

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
  async findOne(id: string): Promise<Veil> {
    const veil = await this.veilRepository.findById(id);
    if (!veil) {
      throw new Error(`Veil with ID ${id} not found`);
    }
    return veil;
  }

  async update(id: string, updateVeilDto: Partial<Veil>): Promise<Veil> {
    const updated = await this.veilRepository.update(id, updateVeilDto);
    if (!updated) {
      throw new Error(`Veil with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.veilRepository.delete(id);
    if (!deleted) {
      throw new Error(`Veil with ID ${id} not found`);
    }
  }
}
