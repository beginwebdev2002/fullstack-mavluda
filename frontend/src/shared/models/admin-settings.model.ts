export interface AdminSettings {
  id: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  socialLinks: Record<string, string>; // Using Record for Map compatibility
  workHours: Record<string, string>;
  ownerInfo: {
    name: string;
    phoneNumber: string;
  };
}
