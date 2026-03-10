import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './common/config/app-config.module';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from '@modules/user';
import { AdminSettingsModule } from '@modules/admin-settings';
import { VeilModule } from '@modules/veil';
import { TreatmentsModule } from '@modules/treatments';
import { GalleryModule } from '@modules/gallery';
import { AuthModule } from '@modules/auth';
import { PaymentModule } from '@modules/payment';
import { BookingModule } from '@modules/booking';
import { InventoryModule } from '@modules/inventory';
import { PartnershipModule } from '@modules/partnership';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    AdminSettingsModule,
    VeilModule,
    TreatmentsModule,
    GalleryModule,
    AuthModule,
    PaymentModule,
    BookingModule,
    InventoryModule,
    PartnershipModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(join(process.cwd(), 'uploads'));
    console.log(process.cwd());
  }
}
