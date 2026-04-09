import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsObject,
  IsArray,
} from 'class-validator';
import {
  IAdminLocation,
  IOwnerInfo,
} from '../../domain/interfaces/admin-settings.interface';

class LocationDto implements IAdminLocation {
  @IsString() @ApiProperty()
  @IsNotEmpty()
  address: string;

  @IsNumber() @ApiProperty()
  latitude: number;

  @IsNumber() @ApiProperty()
  longitude: number;
}

class OwnerInfoDto implements IOwnerInfo {
  @IsString() @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString() @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;
}

export class CreateAdminSettingsDto {
  @ValidateNested() @ApiProperty()
  @Type(() => LocationDto)
  @IsNotEmpty()
  location: LocationDto;

  @IsObject() @ApiPropertyOptional()
  @IsOptional()
  socialLinks: Record<string, string>;

  @IsObject() @ApiPropertyOptional()
  @IsOptional()
  workHours: Record<string, string>;

  @ValidateNested() @ApiProperty()
  @Type(() => OwnerInfoDto)
  @IsNotEmpty()
  ownerInfo: OwnerInfoDto;

  @IsString() @ApiProperty()
  @IsOptional()
  biography: string;

  @IsString() @ApiProperty()
  @IsOptional()
  philosophy: string;

  @IsArray() @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  galleryCategories: string[];

  @IsArray() @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  treatmentCategories: string[];

  @IsArray() @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  veilSilhouettes: string[];

  @IsArray() @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  veilFabrics: string[];

  @IsArray() @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  veilTrainLengths: string[];

  @IsArray() @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  veilNecklines: string[];
}
