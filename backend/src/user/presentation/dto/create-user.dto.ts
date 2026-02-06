import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  telegramId: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsUrl()
  @IsOptional()
  photoUrl?: string;

  @IsEnum(['user', 'admin'])
  @IsOptional()
  role?: 'user' | 'admin';
}
