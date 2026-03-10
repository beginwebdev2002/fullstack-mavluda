import { Injectable } from '@nestjs/common';
import { User } from '@modules/user';
import { UserRepository } from '@modules/user';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return await this.userRepository.create(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
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
