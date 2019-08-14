import { forwardRef, Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { EventHandlers } from './handlers';

@Module({
  imports: [
    forwardRef(() => CqrsMicroservicesModule),
  ],
  providers: [
    ...EventHandlers,
  ],
})
export class EventsModule {}
