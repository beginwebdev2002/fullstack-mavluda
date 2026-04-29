import { Model } from 'mongoose';
import { Treatments } from '../../domain/treatments.entity';
import { TreatmentsDocument } from '../schemas/treatments.schema';
export declare class TreatmentsRepository {
    private readonly treatmentsModel;
    constructor(treatmentsModel: Model<TreatmentsDocument>);
    count(): Promise<number>;
    findAll(): Promise<Treatments[]>;
    create(treatment: Omit<Treatments, 'id' | 'createdAt'>): Promise<Treatments>;
    findById(id: string): Promise<Treatments | null>;
    update(id: string, updateData: Partial<Treatments>): Promise<Treatments | null>;
    delete(id: string): Promise<Treatments | null>;
    private toDomain;
}
