import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { I18nExceptionFilter } from './common/filters/i18n-exception.filter';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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
  const frontendUrl =
    configService.get<string>('FRONTEND_URL') || 'http://localhost:4200';
  app.enableCors({
    origin: [frontendUrl, 'http://localhost:4200', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    maxAge: 3600,
  });
  const PORT = configService.get<number>('port') || 3000;

  await app.listen(PORT);
}
bootstrap().catch((err) => console.error(err));
