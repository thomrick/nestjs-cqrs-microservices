import { Module } from '@nestjs/common';
import { CreateProfileHandler } from './create-profile.command-handler';

@Module({
  controllers: [
    CreateProfileHandler,
  ],
  providers: [
    CreateProfileHandler,
  ],
})
export class CommandHandlersModule {}
