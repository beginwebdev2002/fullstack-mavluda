import { Controller, Get, Body, Put, Post, Delete } from '@nestjs/common';
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
    // Cast to unknown then Omit to satisfy the compiler because DTO technically doesn't have 'id'
    // but the service expects Omit<AdminSettings, 'id'> which matches the structure of the DTO
    return this.adminSettingsService.createSettings(
      createAdminSettingsDto as unknown as Omit<AdminSettings, 'id'>,
    );
  }

  @Put()
  async updateSettings(
    @Body() updateAdminSettingsDto: UpdateAdminSettingsDto,
  ): Promise<AdminSettings> {
    // Clean up undefined values
    const settings = { ...updateAdminSettingsDto };
    Object.keys(settings).forEach(
      (key) => settings[key] === undefined && delete settings[key],
    );

    return this.adminSettingsService.updateSettings(settings);
  }

  @Delete()
  async deleteSettings(): Promise<boolean> {
    return this.adminSettingsService.deleteSettings();
  }
}
