import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
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
  duration: number;

  @IsEnum(['medical', 'beauty'])
  @IsNotEmpty()
  category: 'medical' | 'beauty';
}
