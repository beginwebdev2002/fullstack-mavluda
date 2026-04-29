import { Inventory } from '../domain/inventory.entity';
import { InventoryRepository } from '../infrastructure/repositories/inventory.repository';
import { CreateInventoryDto } from '../presentation/dto/create-inventory.dto';
import { UpdateInventoryDto } from '../presentation/dto/update-inventory.dto';
export declare class InventoryService {
    private readonly inventoryRepository;
    constructor(inventoryRepository: InventoryRepository);
    findAll(): Promise<Inventory[]>;
    create(createInventoryDto: CreateInventoryDto): Promise<Inventory>;
    findOne(id: string): Promise<Inventory>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<Inventory>;
    remove(id: string): Promise<void>;
}
