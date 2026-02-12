import { Injectable } from '@nestjs/common';
import { Partnership } from '../domain/partnership.entity';
import { PartnershipRepository } from '../infrastructure/repositories/partnership.repository';
import { CreatePartnershipDto } from '../presentation/dto/create-partnership.dto';
import { UpdatePartnershipDto } from '../presentation/dto/update-partnership.dto';

@Injectable()
export class PartnershipService {
  constructor(private readonly partnershipRepository: PartnershipRepository) {}

  async findAll(): Promise<Partnership[]> {
    return this.partnershipRepository.findAll();
  }

  async create(createPartnershipDto: CreatePartnershipDto): Promise<Partnership> {
    return this.partnershipRepository.create({
      ...createPartnershipDto,
      status: 'active',
    });
  }

  async findOne(id: string): Promise<Partnership> {
    const partnership = await this.partnershipRepository.findById(id);
    if (!partnership) {
      throw new Error(`Partnership with ID ${id} not found`);
    }
    return partnership;
  }

  async update(id: string, updatePartnershipDto: UpdatePartnershipDto): Promise<Partnership> {
    const updated = await this.partnershipRepository.update(id, updatePartnershipDto);
    if (!updated) {
      throw new Error(`Partnership with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.partnershipRepository.delete(id);
    if (!deleted) {
      throw new Error(`Partnership with ID ${id} not found`);
    }
  }
}
