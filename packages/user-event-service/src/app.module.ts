import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { EventHandlersModule } from './event-handlers';

@Module({
  imports: [
    CqrsMicroservicesModule.connect(),
    EventHandlersModule,
  ],
})
export class AppModule {}
