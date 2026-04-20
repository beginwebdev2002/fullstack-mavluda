import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/user.entity';
import { UserRepository } from '../infrastructure/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async count(): Promise<number> {
    return await this.userRepository.count();
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findOrCreate(
    telegramId: number,
    profile: {
      firstName: string;
      lastName?: string;
      username?: string;
      photoUrl?: string;
    },
  ): Promise<User> {
    let user = await this.userRepository.findByTelegramId(telegramId);

    if (!user) {
      user = await this.userRepository.create({
        telegramId,
        ...profile,
        role: 'user',
      });
    }

    return user;
  }

  async create(
    user: Omit<User, 'id' | 'createdAt'> & { password?: string },
  ): Promise<User> {
    const payload = { ...user };
    if (payload.password) {
      const salt = await bcrypt.genSalt();
      payload.passwordHash = await bcrypt.hash(payload.password, salt);
      delete payload.password;
    }
    return await this.userRepository.create(
      payload as Omit<User, 'id' | 'createdAt'>,
    );
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: Partial<User> & { password?: string },
  ): Promise<User> {
    const payload = { ...updateUserDto };
    if (payload.password) {
      const salt = await bcrypt.genSalt();
      payload.passwordHash = await bcrypt.hash(payload.password, salt);
      delete payload.password;
    }
    const updatedUser = await this.userRepository.update(
      id,
      payload as Partial<User>,
    );
    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new Error(`User with ID ${id} not found`);
    }
  }
}
