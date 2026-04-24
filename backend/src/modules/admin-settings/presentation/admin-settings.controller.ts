import {
  Controller,
  Get,
  Body,
  Put,
  Post,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AdminSettingsService } from '../application/admin-settings.service';
import { AdminSettings } from '../domain/admin-settings.entity';
import { UpdateAdminSettingsDto } from './dto/update-admin-settings.dto';
import { CreateAdminSettingsDto } from './dto/create-admin-settings.dto';

@Controller('admin-settings')
export class AdminSettingsController {
  constructor(private readonly adminSettingsService: AdminSettingsService) {}

  @Get()
  async getSettings(): Promise<AdminSettings | null> {
    try {
      return await this.adminSettingsService.getSettings();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('NOT_FOUND');
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Post()
  async createSettings(
    @Body() createAdminSettingsDto: CreateAdminSettingsDto,
  ): Promise<AdminSettings> {
    try {
      return await this.adminSettingsService.createSettings(
        createAdminSettingsDto as unknown as Omit<AdminSettings, 'id'>,
      );
    } catch {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Put()
  async updateSettings(
    @Body() updateAdminSettingsDto: UpdateAdminSettingsDto,
  ): Promise<AdminSettings> {
    try {
      const settings = { ...updateAdminSettingsDto };
      Object.keys(settings).forEach(
        (key) => settings[key] === undefined && delete settings[key],
      );

      return await this.adminSettingsService.updateSettings(settings);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('NOT_FOUND');
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  @Delete()
  async deleteSettings(): Promise<boolean> {
    try {
      return await this.adminSettingsService.deleteSettings();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new NotFoundException('NOT_FOUND');
      }
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }
}
