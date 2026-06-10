import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { I18nExceptionFilter } from './common/filters/i18n-exception.filter';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const origins = configService.get<string>('FRONTEND_URL');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );
  app.useGlobalFilters(new I18nExceptionFilter());
  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    maxAge: 3600,
  });
  const PORT = configService.get<number>('port') || 3000;
  const IP = configService.get<string>('IP_ADDRESS') || '0.0.0.0';
  console.log('🚀 ~ bootstrap ~ PORT:', IP, PORT);

  await app.listen(PORT, IP);
}
bootstrap().catch((err) => console.error(err));
