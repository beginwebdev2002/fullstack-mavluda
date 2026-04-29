import { IAdminLocation, IAdminSettings, IOwnerInfo } from './interfaces/admin-settings.interface';
export declare class AdminSettings implements IAdminSettings {
    readonly id: string;
    readonly location: IAdminLocation;
    readonly socialLinks: Record<string, string>;
    readonly workHours: Record<string, string>;
    readonly ownerInfo: IOwnerInfo;
    readonly biography: string;
    readonly philosophy: string;
    readonly galleryCategories: string[];
    readonly treatmentCategories: string[];
    readonly veilSilhouettes: string[];
    readonly veilFabrics: string[];
    readonly veilTrainLengths: string[];
    readonly veilNecklines: string[];
    constructor(id: string, location: IAdminLocation, socialLinks: Record<string, string>, workHours: Record<string, string>, ownerInfo: IOwnerInfo, biography: string, philosophy: string, galleryCategories: string[], treatmentCategories: string[], veilSilhouettes: string[], veilFabrics: string[], veilTrainLengths: string[], veilNecklines: string[]);
}
