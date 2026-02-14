import { Injectable } from '@nestjs/common';
import { Inventory } from '../domain/inventory.entity';
import { InventoryRepository } from '../infrastructure/repositories/inventory.repository';
import { CreateInventoryDto } from '../presentation/dto/create-inventory.dto';
import { UpdateInventoryDto } from '../presentation/dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.findAll();
  }

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryRepository.create(createInventoryDto);
  }

  async findOne(id: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new Error(`Inventory item with ID ${id} not found`);
    }
    return inventory;
  }

  async update(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const updated = await this.inventoryRepository.update(
      id,
      updateInventoryDto,
    );
    if (!updated) {
      throw new Error(`Inventory item with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.inventoryRepository.delete(id);
    if (!deleted) {
      throw new Error(`Inventory item with ID ${id} not found`);
    }
  }
}
