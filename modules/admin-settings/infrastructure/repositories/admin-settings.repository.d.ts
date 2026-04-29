import { Model } from 'mongoose';
import { AdminSettings } from '../../domain/admin-settings.entity';
import { AdminSettingsDocument } from '../schemas/admin-settings.schema';
export declare class AdminSettingsRepository {
    private readonly settingsModel;
    constructor(settingsModel: Model<AdminSettingsDocument>);
    getSettings(): Promise<AdminSettings | null>;
    updateSettings(settings: Partial<AdminSettings>): Promise<AdminSettings>;
    createSettings(settings: Omit<AdminSettings, 'id'>): Promise<AdminSettings>;
    deleteSettings(): Promise<boolean>;
    private toDomain;
}
