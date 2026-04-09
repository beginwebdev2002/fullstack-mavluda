import { Test, TestingModule } from '@nestjs/testing';
import { PartnershipService } from './partnership.service';
import { PartnershipRepository } from '../infrastructure/repositories/partnership.repository';

jest.mock('@common/utils', () => ({
  deleteFileSafe: jest.fn(),
}));

describe('PartnershipService', () => {
  let service: PartnershipService;
  let repository: jest.Mocked<PartnershipRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartnershipService,
        {
          provide: PartnershipRepository,
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

    service = module.get<PartnershipService>(PartnershipService);
    repository = module.get(PartnershipRepository);
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
    repository.update.mockResolvedValue(null as any);
    await expect(service.update('1', {} as any)).rejects.toThrow();

    repository.update.mockResolvedValue({} as any);
    await expect(service.update('1', {} as any)).resolves.toEqual({});
  });

  it('should remove', async () => {
    repository.delete.mockResolvedValue(null as any);
    await expect(service.remove('1')).rejects.toThrow();

    repository.delete.mockResolvedValue({ logoUrl: 'img.jpg' } as any);
    await expect(service.remove('1')).resolves.toBeUndefined();
  });
});
