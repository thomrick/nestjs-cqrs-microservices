import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const application: INestMicroservice = await NestFactory.createMicroservice(AppModule);
  return application.listenAsync();
};

bootstrap();
