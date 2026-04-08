import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  const reflector = app.get(require('@nestjs/core').Reflector);
  const { JwtAuthGuard } = require('./common/guards/jwt-auth.guard');
  const { RolesGuard } = require('./common/guards/roles.guard');
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: '*',
    maxAge: 3600,
  });

  const config = new DocumentBuilder()
    .setTitle('Mavluda Beauty API')
    .setDescription('The Mavluda Beauty API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = configService.get<number>('port') || 3000;

  await app.listen(PORT);
}
bootstrap();
