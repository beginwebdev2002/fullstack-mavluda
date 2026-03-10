import { Injectable } from '@nestjs/common';
import { AdminSettings } from '../domain/admin-settings.entity';
import { AdminSettingsRepository } from '../infrastructure/repositories/admin-settings.repository';

@Injectable()
export class AdminSettingsService {
  constructor(
    private readonly adminSettingsRepository: AdminSettingsRepository,
  ) {}

  async getSettings(): Promise<AdminSettings | null> {
    return this.adminSettingsRepository.getSettings();
  }

  async updateSettings(
    settings: Partial<AdminSettings>,
  ): Promise<AdminSettings> {
    return this.adminSettingsRepository.updateSettings(settings);
  }

  async createSettings(
    settings: Omit<AdminSettings, 'id'>,
  ): Promise<AdminSettings> {
    return this.adminSettingsRepository.createSettings(settings);
  }

  async deleteSettings(): Promise<boolean> {
    return this.adminSettingsRepository.deleteSettings();
  }
}
