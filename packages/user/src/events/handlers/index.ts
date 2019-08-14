import { Provider } from '@nestjs/common';
import { UserCreatedHandler } from './user-created.event-handler';

export const EventHandlers: Provider[] = [
  UserCreatedHandler,
];
