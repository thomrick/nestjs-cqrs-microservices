import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { CreateUserHandler } from './commands';
import { UsersController } from './users.controller';

@Module({
  controllers: [
    UsersController,
  ],
  providers: [
    CreateUserHandler,
  ],
})
export class UsersModule {}
