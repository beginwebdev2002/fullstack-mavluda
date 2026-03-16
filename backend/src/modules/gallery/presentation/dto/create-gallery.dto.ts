import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  alt?: string;
}
