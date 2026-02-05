import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './common/config/app-config.module';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './user/user.module';
import { AdminSettingsModule } from './admin-settings/admin-settings.module';
import { VeilModule } from './veil/veil.module';
import { ServiceModule } from './service/service.module';
import { GalleryModule } from './gallery/gallery.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    AdminSettingsModule,
    VeilModule,
    ServiceModule,
    GalleryModule,
    AuthModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
