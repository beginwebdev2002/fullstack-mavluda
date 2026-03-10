import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminSettings } from '../../domain/admin-settings.entity';
import {
  AdminSettingsDocument,
  AdminSettingsSchemaEntity,
} from '../schemas/admin-settings.schema';

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
    settings: Partial<AdminSettings>,
  ): Promise<AdminSettings> {
    const doc = await this.settingsModel
      .findOneAndUpdate({}, { $set: settings }, { new: true, upsert: true })
      .exec();
    return this.toDomain(doc);
  }

  async createSettings(
    settings: Omit<AdminSettings, 'id'>,
  ): Promise<AdminSettings> {
    const doc = await this.settingsModel.create(settings);
    return this.toDomain(doc);
  }

  async deleteSettings(): Promise<boolean> {
    const result = await this.settingsModel.deleteOne({}).exec();
    return result.deletedCount > 0;
  }

  private toDomain(doc: AdminSettingsDocument): AdminSettings {
    const socialLinks = doc.socialLinks
      ? (Object.fromEntries(doc.socialLinks) as Record<string, string>)
      : {};
    const workHours = doc.workHours
      ? (Object.fromEntries(doc.workHours) as Record<string, string>)
      : {};

    return new AdminSettings(
      doc._id.toString(),
      doc.location,
      socialLinks,
      workHours,
      doc.ownerInfo,
    );
  }
}
