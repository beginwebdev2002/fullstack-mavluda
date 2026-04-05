export interface IAdminLocation {
  address: string;
  latitude: number;
  longitude: number;
}

export interface IOwnerInfo {
  name: string;
  phoneNumber: string;
}

export interface IAdminSettings {
  id: string;
  location: IAdminLocation;
  socialLinks: Record<string, string>;
  workHours: Record<string, string>;
  ownerInfo: IOwnerInfo;
  biography: string;
  philosophy: string;
  galleryCategories: string[];
  treatmentCategories: string[];
  veilSilhouettes: string[];
  veilFabrics: string[];
  veilTrainLengths: string[];
  veilNecklines: string[];
}
