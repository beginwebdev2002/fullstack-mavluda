import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from '../../domain/inventory.entity';
import {
  InventoryDocument,
  InventorySchemaEntity,
} from '../schemas/inventory.schema';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectModel(InventorySchemaEntity.name)
    private readonly inventoryModel: Model<InventoryDocument>,
  ) {}

  async findAll(): Promise<Inventory[]> {
    const docs = await this.inventoryModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async create(
    inventory: Omit<Inventory, 'id' | 'lastUpdated'>,
  ): Promise<Inventory> {
    const created = new this.inventoryModel(inventory);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<Inventory | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    const doc = await this.inventoryModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async update(
    id: string,
    updateData: Partial<Inventory>,
  ): Promise<Inventory | null> {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }

    const sanitizedUpdate: {
      itemName?: string;
      quantity?: number;
      location?: string;
    } = {};

    if (typeof updateData.itemName === 'string') {
      sanitizedUpdate.itemName = updateData.itemName;
    }
    if (typeof updateData.quantity === 'number') {
      sanitizedUpdate.quantity = updateData.quantity;
    }
    if (typeof updateData.location === 'string') {
      sanitizedUpdate.location = updateData.location;
    }

    const doc = await this.inventoryModel
      .findByIdAndUpdate(id, { $set: sanitizedUpdate }, { new: true })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.inventoryModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  private toDomain(doc: InventoryDocument): Inventory {
    const d = doc as unknown as {
      _id: { toString: () => string };
      itemName: string;
      quantity: number;
      location: string;
      updatedAt: Date;
    };
    return new Inventory(
      d._id.toString(),
      d.itemName,
      d.quantity,
      d.location,
      d.updatedAt,
    );
  }
}
