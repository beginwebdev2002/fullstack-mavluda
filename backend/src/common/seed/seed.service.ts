import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { UserService } from '@modules/user';
import { AppConfigService } from '@common/config/app-config.service';
import * as bcrypt from 'bcrypt';
import { User } from '@modules/user/domain/user.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly userService: UserService,
    private readonly configService: AppConfigService,
  ) {}

  async onModuleInit() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    try {
      const email = this.configService.adminEmail;
      const password = this.configService.adminPassword;

      if (!email || !password) {
        this.logger.warn('Admin credentials not provided in environment variables. Skipping admin seeding.');
        return;
      }

      const existingAdmin = await this.userService.findByEmail(email);
      if (existingAdmin) {
        this.logger.log('Admin user already exists.');
        return;
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      await this.userService.create({
        firstName: 'Admin',
        lastName: 'Mavluda Beauty',
        email,
        passwordHash,
        role: 'admin',
      } as unknown as Omit<User, 'id' | 'createdAt'>);

      this.logger.log(`Admin user seeded successfully with email: ${email}`);
    } catch (error) {
      this.logger.error('Failed to seed admin user', error);
    }
  }
}
