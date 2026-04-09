import { Test, TestingModule } from '@nestjs/testing';
import { TelegramAuthService } from './telegram-auth.service';
import { AppConfigService } from '../../common/config/app-config.service';
import { createHmac } from 'crypto';
import { UserService } from '@modules/user';

describe('TelegramAuthService', () => {
  let service: TelegramAuthService;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelegramAuthService,
        {
          provide: AppConfigService,
          useValue: {
            telegramBotToken: 'test-token',
          },
        },
        {
          provide: UserService,
          useValue: {
            findOrCreate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TelegramAuthService>(TelegramAuthService);
    userService = module.get(UserService);
  });

  it('should validate initData successfully', async () => {
    const userJson = JSON.stringify({ id: 123, first_name: 'Test' });
    const initDataString = `user=${userJson}&auth_date=1234567890`;

    const secretKey = createHmac('sha256', 'WebAppData').update('test-token').digest();
    const dataCheckString = `auth_date=1234567890\nuser=${userJson}`;
    const hash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    const initDataWithHash = `${initDataString}&hash=${hash}`;

    userService.findOrCreate.mockResolvedValue({ id: '1', firstName: 'Test' } as any);

    await expect(service.validateInitData(initDataWithHash)).resolves.toEqual({ id: '1', firstName: 'Test' });
  });

  it('should reject invalid initData hash', async () => {
    const userJson = JSON.stringify({ id: 123, first_name: 'Test' });
    const initDataString = `user=${userJson}&auth_date=1234567890&hash=invalidhash`;

    await expect(service.validateInitData(initDataString)).rejects.toThrow();
  });
});
