import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateVeilDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  rentalPrice: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }: { value: string | string[] }) => {
    if (!!value && Array.isArray(value)) return value;
    return typeof value === 'string' ? value.split(',') : [];
  })
  images: string[];

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }: { value: boolean | string }) => value === 'true')
  isAvailable?: boolean;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  silhouette?: string;

  @IsString()
  @IsOptional()
  neckline?: string;

  @IsString()
  fabric?: string;

  @IsString()
  trainLength?: string;

  @IsNumber()
  @Type(() => Number)
  stock?: number;
}
