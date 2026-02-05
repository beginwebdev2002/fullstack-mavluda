import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './common/config/configuration';
import { validate } from './common/config/env.validation';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './user/user.module';
import { AdminSettingsModule } from './admin-settings/admin-settings.module';
import { VeilModule } from './veil/veil.module';
import { ServiceModule } from './service/service.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env', // Points to root .env
      validate,
      load: [configuration],
    }),
    DatabaseModule,
    UserModule,
    AdminSettingsModule,
    VeilModule,
    ServiceModule,
    GalleryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
