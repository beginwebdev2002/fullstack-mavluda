import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TelegramAuthService } from './telegram-auth.service';
import { AuthService } from './auth.service';
import { UserModule } from '@modules/user';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '@common/config/app-config.module';
import { AppConfigService } from '@common/config/app-config.service';
import { JwtStrategy } from './infrastructure/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: `${configService.jwtExpiresIn}d` },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [TelegramAuthService, AuthService, JwtStrategy],
  exports: [TelegramAuthService, AuthService, JwtModule],
})
export class AuthModule {}
