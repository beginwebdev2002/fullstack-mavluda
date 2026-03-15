import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-treatments.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
