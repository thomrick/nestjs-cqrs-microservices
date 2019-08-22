import { Module } from '@nestjs/common';
import { CreateProfileHandler } from './handlers';

@Module({
  providers: [
    CreateProfileHandler,
  ],
})
export class CommandsModule {}
