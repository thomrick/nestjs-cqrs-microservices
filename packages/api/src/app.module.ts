import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { UsersModule } from './users';

@Module({
  imports: [
    CqrsMicroservicesModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule {}
