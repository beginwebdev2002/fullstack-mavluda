import { InventoryService } from '../application/inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: CreateInventoryDto): Promise<import("..").Inventory>;
    findAll(): Promise<import("..").Inventory[]>;
    findOne(id: string): Promise<import("..").Inventory>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<import("..").Inventory>;
    remove(id: string): Promise<void>;
}
