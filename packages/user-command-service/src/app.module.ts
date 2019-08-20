import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { Transport } from '@nestjs/microservices';
import { UserCreated } from '@user/core';
import { CommandHandlersModule } from './command-handlers';

@Module({
  imports: [
    CqrsMicroservicesModule.connect({
      events: [
        UserCreated,
      ],
      options: {
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    }),
    CommandHandlersModule,
  ],
})
export class AppModule {}
