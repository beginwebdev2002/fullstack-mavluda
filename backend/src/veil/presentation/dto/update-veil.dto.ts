import { PartialType } from '@nestjs/mapped-types';
import { CreateVeilDto } from './create-veil.dto';

export class UpdateVeilDto extends PartialType(CreateVeilDto) {}
