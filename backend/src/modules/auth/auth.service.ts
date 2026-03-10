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

import { AuthResponse } from './interfaces/auth-response.interface';
import { User } from '@modules/user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.userService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    // Create user logic using UserService.create
    // UserService.create expects Omit<User, 'id' | 'createdAt'>
    const newUser = await this.userService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      passwordHash: passwordHash,
      role: 'user',
      username: registerDto.username,
    } as unknown as Omit<User, 'id' | 'createdAt'>);

    const payload = {
      email: newUser.email,
      sub: newUser.id,
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      photoUrl: newUser.photoUrl,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
