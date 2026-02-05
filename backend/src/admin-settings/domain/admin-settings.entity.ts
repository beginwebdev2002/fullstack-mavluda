export class AdminSettings {
  constructor(
    public readonly id: string,
    public readonly location: {
      address: string;
      latitude: number;
      longitude: number;
    },
    public readonly socialLinks: Map<string, string>,
    public readonly workHours: Map<string, string>, // e.g., 'Mon': '09:00-18:00'
    public readonly ownerInfo: {
      name: string;
      phoneNumber: string;
    },
  ) {}
}
