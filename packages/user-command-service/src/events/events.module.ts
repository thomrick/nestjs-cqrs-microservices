import { Module } from '@nestjs/common';
import { UserCreatedHandler } from './handlers';

@Module({
  providers: [
    UserCreatedHandler,
  ],
})
export class EventsModule {}
