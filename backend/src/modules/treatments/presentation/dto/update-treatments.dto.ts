import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-treatments.dto';
import { Type } from 'class-transformer';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
    @Type(() => Date)
    createdAt?: Date;

    @Type(() => Date)
    updatedAt?: Date;
}