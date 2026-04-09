import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/application/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  it('should validateUser', async () => {
    userService.findByEmail.mockResolvedValue(null as any);
    await expect(service.validateUser('test@test.com', 'pass')).resolves.toEqual(null);
  });

  it('should login', async () => {
    jest.spyOn(service, 'validateUser').mockResolvedValue({ id: '1', email: 'test@test.com' } as any);
    jwtService.sign.mockReturnValue('token');
    await expect(service.login({ email: 'test@test.com', password: 'password' } as any)).resolves.toEqual({ access_token: 'token', refresh_token: 'token' });
  });

  it('should register', async () => {
    userService.findByEmail.mockResolvedValue(null as any);
    userService.create.mockResolvedValue({ id: '1', email: 'new@test.com' } as any);
    jwtService.sign.mockReturnValue('token');
    await expect(service.register({ email: 'new@test.com', password: 'password', firstName: 'New' } as any)).resolves.toEqual({ access_token: 'token', refresh_token: 'token' });
  });
});
