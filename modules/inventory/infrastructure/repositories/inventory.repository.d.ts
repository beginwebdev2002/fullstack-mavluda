import { Model } from 'mongoose';
import { Inventory } from '../../domain/inventory.entity';
import { InventoryDocument } from '../schemas/inventory.schema';
export declare class InventoryRepository {
    private readonly inventoryModel;
    constructor(inventoryModel: Model<InventoryDocument>);
    findAll(): Promise<Inventory[]>;
    create(inventory: Omit<Inventory, 'id' | 'lastUpdated'>): Promise<Inventory>;
    findById(id: string): Promise<Inventory | null>;
    update(id: string, updateData: Partial<Inventory>): Promise<Inventory | null>;
    delete(id: string): Promise<boolean>;
    private toDomain;
}
