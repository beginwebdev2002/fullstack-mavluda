import {
  IsString,
  IsNotEmpty,
  IsNumber,
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

  @IsOptional()
  @IsString()
  image: string;

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
