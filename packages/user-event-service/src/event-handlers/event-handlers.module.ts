import { Module } from '@nestjs/common';
import { UserCreatedHandler } from './user-created.event-handler';

@Module({
  providers: [
    UserCreatedHandler,
  ],
})
export class EventHandlersModule {}
