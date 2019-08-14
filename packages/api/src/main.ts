import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const application: INestApplication = await NestFactory.create(AppModule, new ExpressAdapter());
  return application.listenAsync(8080);
};

bootstrap();
