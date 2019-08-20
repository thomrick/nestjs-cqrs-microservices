import { Module } from '@nestjs/common';
import { CreateUserHandler } from './create-user.command-handler';

@Module({
  providers: [
    CreateUserHandler,
  ],
})
export class CommandHandlersModule {}
