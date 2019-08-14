import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { Transport } from '@nestjs/microservices';
import { UsersModule } from './users';

@Module({
  imports: [
    CqrsMicroservicesModule.forRoot({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
