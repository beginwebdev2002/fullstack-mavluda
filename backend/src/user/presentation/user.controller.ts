import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { User } from '@user/domain/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('profile')
  async getProfile() {
    // Placeholder for profile retrieval logic
    // In a real app, this would use @Req() or @User() decorator to get the authenticated user
    return { message: 'Profile endpoint' };
  }
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
}
