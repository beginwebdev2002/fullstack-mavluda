import {
  IAdminLocation,
  IAdminSettings,
  IOwnerInfo,
} from './interfaces/admin-settings.interface';

export class AdminSettings implements IAdminSettings {
  constructor(
    public readonly id: string,
    public readonly location: IAdminLocation,
    public readonly socialLinks: Record<string, string>,
    public readonly workHours: Record<string, string>,
    public readonly ownerInfo: IOwnerInfo,
  ) {}
}
