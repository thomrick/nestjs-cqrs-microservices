import { Module } from '@nestjs/common';
import { CreateUserHandler } from './handlers';

@Module({
  providers: [
    CreateUserHandler,
  ],
})
export class CommandsModule {}
