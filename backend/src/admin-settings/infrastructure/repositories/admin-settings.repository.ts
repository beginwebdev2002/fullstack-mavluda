import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminSettings } from '@admin-settings/domain/admin-settings.entity';
import {
  AdminSettingsDocument,
  AdminSettingsSchemaEntity,
} from '@admin-settings/infrastructure/schemas/admin-settings.schema';

@Injectable()
export class AdminSettingsRepository {
  constructor(
    @InjectModel(AdminSettingsSchemaEntity.name)
    private readonly settingsModel: Model<AdminSettingsDocument>,
  ) {}

  async getSettings(): Promise<AdminSettings | null> {
    const doc = await this.settingsModel.findOne().exec();
    return doc ? this.toDomain(doc) : null;
  }

  async updateSettings(
    settings: Omit<AdminSettings, 'id'>,
  ): Promise<AdminSettings> {
    const doc = await this.settingsModel.findOneAndUpdate(
      {},
      { $set: settings },
      { new: true, upsert: true },
    );
    return this.toDomain(doc);
  }
  async createSettings(
    settings: Omit<AdminSettings, 'id'>,
  ): Promise<AdminSettings> {
    const doc = await this.settingsModel.create(settings);
    return this.toDomain(doc);
  }

  private toDomain(doc: AdminSettingsDocument): AdminSettings {
    return new AdminSettings(
      doc._id.toString(),
      doc.location,
      doc.socialLinks,
      doc.workHours,
      doc.ownerInfo,
    );
  }
}
