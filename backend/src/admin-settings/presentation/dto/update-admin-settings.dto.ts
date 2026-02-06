import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminSettingsDto } from './create-admin-settings.dto';

export class UpdateAdminSettingsDto extends PartialType(
  CreateAdminSettingsDto,
) {}
