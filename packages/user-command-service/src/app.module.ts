import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { CommandsModule } from './commands';
import { EventsModule } from './events';

@Module({
  imports: [
    CqrsMicroservicesModule.install(),
    CommandsModule,
    EventsModule,
  ],
})
export class AppModule {}
