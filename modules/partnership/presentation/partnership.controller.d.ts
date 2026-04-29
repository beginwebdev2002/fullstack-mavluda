import { PartnershipService } from '../application/partnership.service';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';
export declare class PartnershipController {
    private readonly partnershipService;
    constructor(partnershipService: PartnershipService);
    create(createPartnershipDto: CreatePartnershipDto): Promise<import("..").Partnership>;
    findAll(): Promise<import("..").Partnership[]>;
    findOne(id: string): Promise<import("..").Partnership>;
    update(id: string, updatePartnershipDto: UpdatePartnershipDto): Promise<import("..").Partnership>;
    remove(id: string): Promise<void>;
}
