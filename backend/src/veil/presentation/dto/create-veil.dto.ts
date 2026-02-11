import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsString({ each: true })
  @IsNotEmpty()
  images: string[];

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @IsOptional()
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
  @IsOptional()
  fabric?: string;

  @IsString()
  @IsOptional()
  trainLength?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  stock?: number;
}
