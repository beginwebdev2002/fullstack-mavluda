import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UserModule } from '@modules/user';
import { AppConfigModule } from '@common/config/app-config.module';

@Module({
  imports: [UserModule, AppConfigModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
