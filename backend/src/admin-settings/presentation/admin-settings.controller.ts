import { Controller, Get, Body, Put, Post } from '@nestjs/common';
import { AdminSettingsService } from '../application/admin-settings.service';
import { AdminSettings } from '../domain/admin-settings.entity';
import { UpdateAdminSettingsDto } from './dto/update-admin-settings.dto';
import { CreateAdminSettingsDto } from './dto/create-admin-settings.dto';

@Controller('admin-settings')
export class AdminSettingsController {
  constructor(private readonly adminSettingsService: AdminSettingsService) {}

  @Get()
  async getSettings(): Promise<AdminSettings | null> {
    return this.adminSettingsService.getSettings();
  }

  @Post()
  async createSettings(
    @Body() createAdminSettingsDto: CreateAdminSettingsDto,
  ): Promise<AdminSettings> {
    const settings = {
      ...createAdminSettingsDto,
      socialLinks: createAdminSettingsDto.socialLinks
        ? new Map(Object.entries(createAdminSettingsDto.socialLinks))
        : new Map(),
      workHours: createAdminSettingsDto.workHours
        ? new Map(Object.entries(createAdminSettingsDto.workHours))
        : new Map(),
    } as unknown as Omit<AdminSettings, 'id'>;

    return this.adminSettingsService.createSettings(settings);
  }

  @Put()
  async updateSettings(
    @Body() updateAdminSettingsDto: UpdateAdminSettingsDto,
  ): Promise<AdminSettings> {
    const settings = {
      ...updateAdminSettingsDto,
      socialLinks: updateAdminSettingsDto.socialLinks
        ? new Map(Object.entries(updateAdminSettingsDto.socialLinks))
        : undefined,
      workHours: updateAdminSettingsDto.workHours
        ? new Map(Object.entries(updateAdminSettingsDto.workHours))
        : undefined,
    };

    // Remove undefined keys to avoid overriding with undefined
    Object.keys(settings).forEach(
      (key) => settings[key] === undefined && delete settings[key],
    );

    return this.adminSettingsService.updateSettings(
      settings as unknown as Omit<AdminSettings, 'id'>,
    );
  }
}
