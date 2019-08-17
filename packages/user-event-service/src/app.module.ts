import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { Transport } from '@nestjs/microservices';
import { EventHandlersModule } from './event-handlers';

@Module({
  imports: [
    CqrsMicroservicesModule.connect({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    }),
    EventHandlersModule,
  ],
})
export class AppModule {}
