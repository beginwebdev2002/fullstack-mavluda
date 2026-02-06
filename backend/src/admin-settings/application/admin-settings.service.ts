import { Injectable } from '@nestjs/common';
import { AdminSettings } from '@admin-settings/domain/admin-settings.entity';
import { AdminSettingsRepository } from '@admin-settings/infrastructure/repositories/admin-settings.repository';

@Injectable()
export class AdminSettingsService {
  constructor(
    private readonly adminSettingsRepository: AdminSettingsRepository,
  ) {}

  async getSettings(): Promise<AdminSettings | null> {
    return this.adminSettingsRepository.getSettings();
  }

  async updateSettings(
    settings: Omit<AdminSettings, 'id'>,
  ): Promise<AdminSettings> {
    return this.adminSettingsRepository.updateSettings(settings);
  }

  async createSettings(
    settings: Omit<AdminSettings, 'id'>,
  ): Promise<AdminSettings> {
    return this.adminSettingsRepository.createSettings(settings);
  }
}
