import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { EventsModule } from './events';

@Module({
  imports: [
    CqrsMicroservicesModule.install(),
    EventsModule,
  ],
})
export class AppModule {}
