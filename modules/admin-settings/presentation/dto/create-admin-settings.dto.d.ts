import { IAdminLocation, IOwnerInfo } from '../../domain/interfaces/admin-settings.interface';
declare class LocationDto implements IAdminLocation {
    address: string;
    latitude: number;
    longitude: number;
}
declare class OwnerInfoDto implements IOwnerInfo {
    name: string;
    phoneNumber: string;
}
export declare class CreateAdminSettingsDto {
    location: LocationDto;
    socialLinks: Record<string, string>;
    workHours: Record<string, string>;
    ownerInfo: OwnerInfoDto;
    biography: string;
    philosophy: string;
    galleryCategories: string[];
    treatmentCategories: string[];
    veilSilhouettes: string[];
    veilFabrics: string[];
    veilTrainLengths: string[];
    veilNecklines: string[];
}
export {};
