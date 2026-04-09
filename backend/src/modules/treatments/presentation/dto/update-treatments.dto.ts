import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-treatments.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
