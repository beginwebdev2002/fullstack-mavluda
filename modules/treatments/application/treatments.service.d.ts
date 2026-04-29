import { Treatments } from '../domain/treatments.entity';
import { TreatmentsRepository } from '../infrastructure/repositories/treatments.repository';
export declare class TreatmentsService {
    private readonly treatmentsRepository;
    constructor(treatmentsRepository: TreatmentsRepository);
    count(): Promise<number>;
    findAll(): Promise<Treatments[]>;
    create(treatments: Omit<Treatments, 'id' | 'createdAt'>): Promise<Treatments>;
    findOne(id: string): Promise<Treatments>;
    update(id: string, updateTreatmentsDto: Partial<Treatments>): Promise<Treatments>;
    remove(id: string): Promise<void>;
    private deleteFile;
}
