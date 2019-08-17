import { Module } from '@nestjs/common';
import { UserCreatedHandler } from './user-created.event-handler';

@Module({
  controllers: [
    UserCreatedHandler,
  ],
  providers: [
    UserCreatedHandler,
  ],
})
export class EventHandlersModule {}
