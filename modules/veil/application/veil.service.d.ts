import { Veil } from '../domain/veil.entity';
import { VeilRepository } from '../infrastructure/repositories/veil.repository';
export declare class VeilService {
    private readonly veilRepository;
    constructor(veilRepository: VeilRepository);
    count(): Promise<number>;
    findAll(): Promise<Veil[]>;
    getAvailable(): Promise<Veil[]>;
    create(veil: Omit<Veil, 'id' | 'createdAt'>): Promise<Veil>;
    findOne(id: string): Promise<Veil>;
    update(id: string, updateVeilDto: Partial<Veil>): Promise<Veil>;
    remove(id: string): Promise<void>;
}
