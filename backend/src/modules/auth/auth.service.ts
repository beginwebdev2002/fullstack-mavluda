import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@modules/user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AppConfigService } from '@common/config/app-config.service';

import { AuthResponse } from './interfaces/auth-response.interface';
import { User } from '@modules/user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: AppConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.userService.findByEmail(email);
    if (user && user.passwordHash) {
      const isMatch = await bcrypt.compare(pass, user.passwordHash);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...result } = user;
        return result;
      }
    }
    return null;
  }

  private generateTokens(user: Partial<User>) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.jwtRefreshSecret,
      expiresIn: this.configService.jwtRefreshExpiresIn as any,
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; refresh_token: string; user: Omit<User, 'passwordHash' | 'createdAt'> }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const tokens = this.generateTokens(user);
    const { createdAt, ...userPayload } = user;
    
    return {
      ...tokens,
      user: userPayload as Omit<User, 'passwordHash' | 'createdAt'>,
    };
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string; refresh_token: string; user: Omit<User, 'passwordHash' | 'createdAt'> }> {
    const existing = await this.userService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    const newUser = await this.userService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      passwordHash: passwordHash,
      role: 'user',
      username: registerDto.username,
    } as unknown as Omit<User, 'id' | 'createdAt'>);

    const tokens = this.generateTokens(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, createdAt, ...userPayload } = newUser;

    return {
      ...tokens,
      user: userPayload as Omit<User, 'passwordHash' | 'createdAt'>,
    };
  }

  async refreshTokens(refreshToken: string): Promise<{ access_token: string; refresh_token: string; user: Omit<User, 'passwordHash' | 'createdAt'> }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.jwtRefreshSecret,
      });
      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      
      const tokens = this.generateTokens(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, createdAt, ...userPayload } = user;
      
      return {
        ...tokens,
        user: userPayload as Omit<User, 'passwordHash' | 'createdAt'>,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
