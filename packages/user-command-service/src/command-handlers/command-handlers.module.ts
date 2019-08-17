import { Module } from '@nestjs/common';
import { CreateUserHandler } from './create-user.command-handler';

@Module({
  controllers: [
    CreateUserHandler,
  ],
  providers: [
    CreateUserHandler,
  ],
})
export class CommandHandlersModule {}
