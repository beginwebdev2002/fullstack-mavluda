import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { MockCardStrategy } from './strategies/mock-card.strategy';
import { AlifPayStrategy } from './strategies/alif-pay.strategy';

describe('PaymentService', () => {
  let service: PaymentService;
  let mockCardStrategy: jest.Mocked<MockCardStrategy>;
  let alifPayStrategy: jest.Mocked<AlifPayStrategy>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: MockCardStrategy,
          useValue: {
            name: 'mock-card',
            initiatePayment: jest.fn(),
            validateCallback: jest.fn(),
          },
        },
        {
          provide: AlifPayStrategy,
          useValue: {
            name: 'alifpay',
            initiatePayment: jest.fn(),
            validateCallback: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    mockCardStrategy = module.get(MockCardStrategy);
    alifPayStrategy = module.get(AlifPayStrategy);
  });

  it('should initiate payment via alifpay', async () => {
    alifPayStrategy.initiatePayment.mockResolvedValue({ success: true, transactionId: 'txn1', provider: 'alifpay' });
    await expect(service.initiatePayment('alifpay', {} as any)).resolves.toEqual({ success: true, transactionId: 'txn1', provider: 'alifpay' });
  });

  it('should initiate payment via mock-card', async () => {
    mockCardStrategy.initiatePayment.mockResolvedValue({ success: true, transactionId: 'txn2', provider: 'mock-card' });
    await expect(service.initiatePayment('mock-card', {} as any)).resolves.toEqual({ success: true, transactionId: 'txn2', provider: 'mock-card' });
  });

  it('should fail if method unsupported', async () => {
    await expect(service.initiatePayment('unknown', {} as any)).rejects.toThrow();
  });

  it('should handle callback via alifpay', async () => {
    alifPayStrategy.validateCallback.mockResolvedValue({ success: true, transactionId: 'txn1', provider: 'alifpay' });
    await expect(service.handleCallback('alifpay', {} as any)).resolves.toEqual({ success: true, transactionId: 'txn1', provider: 'alifpay' });
  });

  it('should handle callback via mock-card', async () => {
    mockCardStrategy.validateCallback.mockResolvedValue({ success: true, transactionId: 'txn2', provider: 'mock-card' });
    await expect(service.handleCallback('mock-card', {} as any)).resolves.toEqual({ success: true, transactionId: 'txn2', provider: 'mock-card' });
  });

  it('should fail callback if unsupported method', async () => {
    await expect(service.handleCallback('unknown', {} as any)).rejects.toThrow();
  });
});
