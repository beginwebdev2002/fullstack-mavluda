import { Test, TestingModule } from '@nestjs/testing';
import { AdminSettingsService } from './admin-settings.service';
import { AdminSettingsRepository } from '../infrastructure/repositories/admin-settings.repository';

describe('AdminSettingsService', () => {
  let service: AdminSettingsService;
  let repository: jest.Mocked<AdminSettingsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminSettingsService,
        {
          provide: AdminSettingsRepository,
          useValue: {
            getSettings: jest.fn(),
            updateSettings: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdminSettingsService>(AdminSettingsService);
    repository = module.get(AdminSettingsRepository);
  });

  it('should getSettings', async () => {
    repository.getSettings.mockResolvedValue({} as any);
    await expect(service.getSettings()).resolves.toEqual({});
  });

  it('should updateSettings', async () => {
    repository.updateSettings.mockResolvedValue({} as any);
    await expect(service.updateSettings({} as any)).resolves.toEqual({});
  });
});
