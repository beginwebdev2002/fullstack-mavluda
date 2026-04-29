import { AdminSettings } from '../domain/admin-settings.entity';
import { AdminSettingsRepository } from '../infrastructure/repositories/admin-settings.repository';
export declare class AdminSettingsService {
    private readonly adminSettingsRepository;
    constructor(adminSettingsRepository: AdminSettingsRepository);
    getSettings(): Promise<AdminSettings | null>;
    updateSettings(settings: Partial<AdminSettings>): Promise<AdminSettings>;
    createSettings(settings: Omit<AdminSettings, 'id'>): Promise<AdminSettings>;
    deleteSettings(): Promise<boolean>;
}
