import { Test, TestingModule } from '@nestjs/testing';
import { VeilService } from './veil.service';
import { VeilRepository } from '../infrastructure/repositories/veil.repository';

jest.mock('@common/utils', () => ({
  deleteFileSafe: jest.fn(),
}));

describe('VeilService', () => {
  let service: VeilService;
  let repository: jest.Mocked<VeilRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VeilService,
        {
          provide: VeilRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VeilService>(VeilService);
    repository = module.get(VeilRepository);
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

  it('should create', async () => {
    repository.create.mockResolvedValue({} as any);
    await expect(service.create({} as any)).resolves.toEqual({});
  });

  it('should update', async () => {
    repository.findById.mockResolvedValue(null as any);
    await expect(service.update('1', {} as any)).rejects.toThrow();

    repository.findById.mockResolvedValue({ imageUrl: 'old.jpg' } as any);
    repository.update.mockResolvedValue(null as any);
    await expect(service.update('1', {} as any)).rejects.toThrow();

    repository.update.mockResolvedValue({ imageUrl: 'new.jpg' } as any);
    await expect(service.update('1', {} as any)).resolves.toEqual({ imageUrl: 'new.jpg' });
  });

  it('should remove', async () => {
    repository.findById.mockResolvedValue({} as any);
    repository.delete.mockResolvedValue(null as any);
    await expect(service.remove('1')).rejects.toThrow();

    repository.delete.mockResolvedValue({ imageUrl: 'img.jpg' } as any);
    await expect(service.remove('1')).resolves.toBeUndefined();
  });
});
