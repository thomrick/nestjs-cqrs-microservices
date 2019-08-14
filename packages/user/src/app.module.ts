import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { CommandsModule } from './commands/commands.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    CqrsMicroservicesModule.forRoot(),
    CommandsModule,
    EventsModule,
  ],
})
export class AppModule {}
