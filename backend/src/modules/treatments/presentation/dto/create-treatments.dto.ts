import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export enum TreatmentCategory {
  Medical = 'medical',
  Beauty = 'beauty',
  Injectables = 'injectables',
  Massage = 'massage',
  Skin = 'skin',
  Hair = 'hair',
  Nails = 'nails',
  Other = 'other',
}

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  price: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  duration: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  image: string;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
