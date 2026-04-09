import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { User } from '@modules/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { AuthenticatedRequest } from '@common/interfaces/authenticated-request.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads/users',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
};

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    const userData: Record<string, any> = { ...createUserDto };
    if (file) {
      userData['photoUrl'] = `/uploads/users/${file.filename}`;
    }
    return this.userService.create(
      userData as Omit<User, 'id' | 'createdAt'> & { password?: string },
    );
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
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    const userData: Record<string, any> = { ...updateUserDto };
    if (file) {
      userData['photoUrl'] = `/uploads/users/${file.filename}`;
    }
    return this.userService.update(id, userData);
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
