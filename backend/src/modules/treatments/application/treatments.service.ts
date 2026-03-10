import { Injectable } from '@nestjs/common';
import { Treatments } from '@modules/treatments';
import { TreatmentsRepository } from '@modules/treatments';

@Injectable()
export class TreatmentsService {
  constructor(private readonly treatmentsRepository: TreatmentsRepository) {}

  async findAll(): Promise<Treatments[]> {
    return this.treatmentsRepository.findAll();
  }

  async create(
    treatments: Omit<Treatments, 'id' | 'createdAt'>,
  ): Promise<Treatments> {
    return this.treatmentsRepository.create(treatments);
  }
  async findOne(id: string): Promise<Treatments> {
    const treatment = await this.treatmentsRepository.findById(id);
    if (!treatment) {
      throw new Error(`Service with ID ${id} not found`);
    }
    return treatment;
  }

  async update(
    id: string,
    updateTreatmentsDto: Partial<Treatments>,
  ): Promise<Treatments> {
    const updated = await this.treatmentsRepository.update(
      id,
      updateTreatmentsDto,
    );
    if (!updated) {
      throw new Error(`Service with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.treatmentsRepository.delete(id);
    if (!deleted) {
      throw new Error(`Service with ID ${id} not found`);
    }
  }
}
