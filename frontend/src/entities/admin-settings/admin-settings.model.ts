export interface AdminLocation {
  address: string;
  latitude: number;
  longitude: number;
}

export interface OwnerInfo {
  name: string;
  phoneNumber: string;
}

export interface AdminSettings {
  id: string;
  location: AdminLocation;
  socialLinks: Record<string, string>;
  workHours: Record<string, string>;
  ownerInfo: OwnerInfo;
  galleryCategories: string[];
  treatmentCategories: string[];
  veilSilhouettes: string[];
  veilFabrics: string[];
  veilTrainLengths: string[];
  veilNecklines: string[];
}
