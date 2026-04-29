import { Model } from 'mongoose';
import { Veil } from '../../domain/veil.entity';
import { VeilDocument } from '../schemas/veil.schema';
export declare class VeilRepository {
    private readonly veilModel;
    constructor(veilModel: Model<VeilDocument>);
    count(): Promise<number>;
    findAll(): Promise<Veil[]>;
    findAvailable(): Promise<Veil[]>;
    create(veil: Omit<Veil, 'id' | 'createdAt'>): Promise<Veil>;
    findById(id: string): Promise<Veil | null>;
    update(id: string, updateData: Partial<Veil>): Promise<Veil | null>;
    delete(id: string): Promise<boolean>;
    private toDomain;
}
