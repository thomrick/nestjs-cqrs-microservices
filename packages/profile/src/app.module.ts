import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { Transport } from '@nestjs/microservices';
import { CommandsModule } from './commands/commands.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    CqrsMicroservicesModule.forRoot({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    }),
    CommandsModule,
    EventsModule,
  ],
})
export class AppModule {}
