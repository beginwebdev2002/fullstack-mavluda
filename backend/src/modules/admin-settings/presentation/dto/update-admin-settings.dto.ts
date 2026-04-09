import { PartialType } from '@nestjs/swagger';
import { CreateAdminSettingsDto } from './create-admin-settings.dto';

export class UpdateAdminSettingsDto extends PartialType(
  CreateAdminSettingsDto,
) {}
