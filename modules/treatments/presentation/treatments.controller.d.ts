import { CreateServiceDto as CreateTreatmentDto, Treatments, TreatmentsService, UpdateServiceDto as UpdateTreatmentDto } from '@modules/treatments';
export declare class TreatmentsController {
    private readonly treatmentsService;
    constructor(treatmentsService: TreatmentsService);
    count(): Promise<number>;
    findAll(): Promise<Treatments[]>;
    findOne(id: string): Promise<Treatments>;
    create(createTreatmentDto: CreateTreatmentDto, files: Array<Express.Multer.File>): Promise<any>;
    update(id: string, updateTreatmentDto: UpdateTreatmentDto, files: Array<Express.Multer.File>): Promise<Treatments>;
    remove(id: string): Promise<void>;
}
