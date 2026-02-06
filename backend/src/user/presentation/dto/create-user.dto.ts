import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsUrl,
  isNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  telegramId: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsUrl()
  @IsNotEmpty()
  photoUrl?: string;

  @IsEnum(['user', 'admin'])
  role?: 'user' | 'admin';
}
