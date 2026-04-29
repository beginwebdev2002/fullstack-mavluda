import { VeilService } from '../application/veil.service';
import { Veil } from '../domain/veil.entity';
import { CreateVeilDto } from './dto/create-veil.dto';
import { UpdateVeilDto } from './dto/update-veil.dto';
export declare class VeilController {
    private readonly veilService;
    constructor(veilService: VeilService);
    count(): Promise<number>;
    findAll(): Promise<Veil[]>;
    getAvailable(): Promise<Veil[]>;
    findOne(id: string): Promise<Veil>;
    create(createVeilDto: CreateVeilDto, files: Array<Express.Multer.File>): Promise<Veil>;
    update(id: string, updateVeilDto: UpdateVeilDto, files: Array<Express.Multer.File>): Promise<Veil>;
    remove(id: string): Promise<void>;
}
