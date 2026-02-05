import { Injectable } from '@nestjs/common';
import { User } from '@user/domain/user.entity';
import { UserRepository } from '@user/infrastructure/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
