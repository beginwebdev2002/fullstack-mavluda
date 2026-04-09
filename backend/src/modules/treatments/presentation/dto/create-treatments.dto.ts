import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @IsString() @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString() @ApiProperty()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber() @ApiProperty()
  @Min(1)
  price: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean() @ApiPropertyOptional()
  active: boolean;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber() @ApiProperty()
  @Min(1)
  duration: number;

  @IsNotEmpty()
  @IsString() @ApiProperty()
  category: string;

  @IsOptional()
  @IsString() @ApiProperty()
  imageUrl: string;
}
