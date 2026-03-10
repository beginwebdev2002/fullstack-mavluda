import { Injectable } from '@nestjs/common';
import { AdminSettings } from '@modules/admin-settings';
import { AdminSettingsRepository } from '@modules/admin-settings';

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
