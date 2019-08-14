import { Provider, Type } from '@nestjs/common';
import { CreateProfileHandler } from './create-profile.command-handler';

export const CommandHandlers: Array<Provider & Type<any>> = [
  CreateProfileHandler,
];
