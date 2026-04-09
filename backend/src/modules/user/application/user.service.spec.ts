import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../infrastructure/repositories/user.repository';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findByTelegramId: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);
  });

  it('should findAll', async () => {
    repository.findAll.mockResolvedValue([]);
    await expect(service.findAll()).resolves.toEqual([]);
  });

  it('should findOne', async () => {
    repository.findById.mockResolvedValue(null as any);
    await expect(service.findOne('1')).rejects.toThrow();
    repository.findById.mockResolvedValue({} as any);
    await expect(service.findOne('1')).resolves.toEqual({});
  });

  it('should findByEmail', async () => {
    repository.findByEmail.mockResolvedValue(null as any);
    await expect(service.findByEmail('test@test.com')).resolves.toEqual(null);
    repository.findByEmail.mockResolvedValue({} as any);
    await expect(service.findByEmail('test@test.com')).resolves.toEqual({});
  });

  it('should create', async () => {
    repository.create.mockResolvedValue({} as any);
    await expect(service.create({} as any)).resolves.toEqual({});
  });

  it('should update', async () => {
    repository.update.mockResolvedValue(null as any);
    await expect(service.update('1', {} as any)).rejects.toThrow();
    repository.update.mockResolvedValue({} as any);
    await expect(service.update('1', {} as any)).resolves.toEqual({});
  });

  it('should remove', async () => {
    repository.delete.mockResolvedValue(false);
    await expect(service.remove('1')).rejects.toThrow();
    repository.delete.mockResolvedValue(true);
    await expect(service.remove('1')).resolves.toBeUndefined();
  });

  it('should findOrCreate', async () => {
    repository.findByTelegramId.mockResolvedValue({} as any);
    await expect(service.findOrCreate(123, { firstName: 'Test' })).resolves.toEqual({});
    repository.findByTelegramId.mockResolvedValue(null as any);
    repository.create.mockResolvedValue({ id: '1' } as any);
    await expect(service.findOrCreate(123, { firstName: 'Test' })).resolves.toEqual({ id: '1' });
  });
});
