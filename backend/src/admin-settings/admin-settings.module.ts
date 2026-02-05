import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSettingsService } from './application/admin-settings.service';
import { AdminSettingsRepository } from './infrastructure/repositories/admin-settings.repository';
import {
  AdminSettingsSchema,
  AdminSettingsSchemaEntity,
} from './infrastructure/schemas/admin-settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminSettingsSchemaEntity.name, schema: AdminSettingsSchema },
    ]),
  ],
  providers: [AdminSettingsService, AdminSettingsRepository],
  exports: [AdminSettingsService],
})
export class AdminSettingsModule {}
