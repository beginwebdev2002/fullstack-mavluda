import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TelegramAuthService } from './telegram-auth.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [TelegramAuthService],
  exports: [TelegramAuthService],
})
export class AuthModule {}
