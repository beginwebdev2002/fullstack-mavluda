import { Injectable } from '@nestjs/common';
import { Treatments } from '../domain/treatments.entity';
import { TreatmentsRepository } from '../infrastructure/repositories/treatments.repository';
import { deleteFileSafe } from '@common/utils';

@Injectable()
export class TreatmentsService {
  constructor(private readonly treatmentsRepository: TreatmentsRepository) {}

  async count(): Promise<number> {
    return this.treatmentsRepository.count();
  }

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
    const existing = await this.treatmentsRepository.findById(id);
    if (!existing) {
      throw new Error(`Service with ID ${id} not found`);
    }
    const updated = await this.treatmentsRepository.update(
      id,
      updateTreatmentsDto,
    );
    if (!updated) {
      throw new Error(`Service with ID ${id} not found`);
    }
    if (updated?.imageUrl && existing?.imageUrl) {
      await deleteFileSafe(existing.imageUrl);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.treatmentsRepository.delete(id);
    if (!deleted) {
      throw new Error(`Service with ID ${id} not found`);
    }
    if (deleted?.imageUrl) {
      await deleteFileSafe(deleted.imageUrl);
    }
  }

  private async deleteFile(filePath: string): Promise<void> {
    try {
      await deleteFileSafe(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}
