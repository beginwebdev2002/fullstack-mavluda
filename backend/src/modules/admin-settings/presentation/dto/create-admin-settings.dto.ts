import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsObject,
} from 'class-validator';
import {
  IAdminLocation,
  IOwnerInfo,
} from '../../domain/interfaces/admin-settings.interface';

class LocationDto implements IAdminLocation {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

class OwnerInfoDto implements IOwnerInfo {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

export class CreateAdminSettingsDto {
  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  location: LocationDto;

  @IsObject()
  @IsOptional()
  socialLinks: Record<string, string>;

  @IsObject()
  @IsOptional()
  workHours: Record<string, string>;

  @ValidateNested()
  @Type(() => OwnerInfoDto)
  @IsNotEmpty()
  ownerInfo: OwnerInfoDto;
}
