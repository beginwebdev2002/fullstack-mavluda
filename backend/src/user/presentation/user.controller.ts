import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { User } from '@user/domain/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { AuthenticatedRequest } from '../../common/interfaces/authenticated-request.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // Mapping DTO to Domain Entity (simple casting for now, or use a mapper)
    const user = createUserDto as unknown as Omit<User, 'id' | 'createdAt'>;
    return this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(
      id,
      updateUserDto as unknown as Partial<User>,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Get('profile')
  async getProfile(@Req() req: AuthenticatedRequest): Promise<User> {
    const userId = req.user?.sub || req.user?.id;
    if (!userId) {
      throw new Error('User not found in request');
    }
    return this.userService.findOne(userId);
  }
}
