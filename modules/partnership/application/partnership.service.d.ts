import { Partnership } from '../domain/partnership.entity';
import { PartnershipRepository } from '../infrastructure/repositories/partnership.repository';
import { CreatePartnershipDto } from '../presentation/dto/create-partnership.dto';
import { UpdatePartnershipDto } from '../presentation/dto/update-partnership.dto';
export declare class PartnershipService {
    private readonly partnershipRepository;
    constructor(partnershipRepository: PartnershipRepository);
    findAll(): Promise<Partnership[]>;
    create(createPartnershipDto: CreatePartnershipDto): Promise<Partnership>;
    findOne(id: string): Promise<Partnership>;
    update(id: string, updatePartnershipDto: UpdatePartnershipDto): Promise<Partnership>;
    remove(id: string): Promise<void>;
}
