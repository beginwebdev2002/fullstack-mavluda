import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/application/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
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

  async login(loginDto: LoginDto) {
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
      photoUrl: user.photoUrl
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const existing = await this.userService.findByEmail(registerDto.email);
    if (existing) {
       throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    // Create user logic using UserService.create
    // UserService.create expects Omit<User, 'id' | 'createdAt'>
    // User constructor params: firstName, telegramId?, email?, passwordHash?, lastName?, username?, photoUrl?, role?
    // We strictly follow User type used in UserService
    
    const newUser = await this.userService.create({
       firstName: registerDto.firstName,
       lastName: registerDto.lastName,
       email: registerDto.email,
       passwordHash: passwordHash,
       role: 'user',
       // Optional fields mapping
       username: registerDto.username,
       // Must explicitly undefined or omitting optional fields?
       // Typescript should allow missing optional fields if they are optional in type.
    } as any); 

    const payload = { 
      email: newUser.email, 
      sub: newUser.id, 
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      photoUrl: newUser.photoUrl
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
