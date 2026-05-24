import { AdminSettingsModule } from '@modules/admin-settings';
import { AuthModule } from '@modules/auth';
import { BookingModule } from '@modules/booking';
import { GalleryModule } from '@modules/gallery';
import { InventoryModule } from '@modules/inventory';
import { PartnershipModule } from '@modules/partnership';
import { PaymentModule } from '@modules/payment';
import { TreatmentsModule } from '@modules/treatments';
import { UserModule } from '@modules/user';
import { VeilModule } from '@modules/veil';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@common/config';
import { DatabaseModule } from '@common/database';
import { SeedModule } from '@common/seed';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    SeedModule,
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
  constructor() {}
}
