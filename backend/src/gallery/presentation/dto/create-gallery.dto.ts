import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
