import { Model } from 'mongoose';
import { Partnership } from '../../domain/partnership.entity';
import { PartnershipDocument } from '../schemas/partnership.schema';
export declare class PartnershipRepository {
    private readonly partnershipModel;
    constructor(partnershipModel: Model<PartnershipDocument>);
    findAll(): Promise<Partnership[]>;
    create(partnership: Omit<Partnership, 'id' | 'createdAt'>): Promise<Partnership>;
    findById(id: string): Promise<Partnership | null>;
    update(id: string, updateData: Partial<Partnership>): Promise<Partnership | null>;
    delete(id: string): Promise<boolean>;
    private toDomain;
}
