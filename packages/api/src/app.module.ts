import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { UsersModule } from './users';

@Module({
  imports: [
    CqrsMicroservicesModule,
    UsersModule,
  ],
})
export class AppModule {}
