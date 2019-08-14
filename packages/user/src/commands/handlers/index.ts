import { Provider, Type } from '@nestjs/common';
import { CreateUserHandler } from './create-user.command-handler';

export const CommandHandlers: Array<Provider & Type<any>> = [
  CreateUserHandler,
];
