import { AdminSettingsService } from '../application/admin-settings.service';
import { AdminSettings } from '../domain/admin-settings.entity';
import { UpdateAdminSettingsDto } from './dto/update-admin-settings.dto';
import { CreateAdminSettingsDto } from './dto/create-admin-settings.dto';
export declare class AdminSettingsController {
    private readonly adminSettingsService;
    constructor(adminSettingsService: AdminSettingsService);
    getSettings(): Promise<AdminSettings | null>;
    createSettings(createAdminSettingsDto: CreateAdminSettingsDto): Promise<AdminSettings>;
    updateSettings(updateAdminSettingsDto: UpdateAdminSettingsDto): Promise<AdminSettings>;
    deleteSettings(): Promise<boolean>;
}
