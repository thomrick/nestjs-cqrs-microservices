import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { CreateUser } from '@user/core';
import { UsersModule } from './users';

@Module({
  imports: [
    CqrsMicroservicesModule.register({
      commands: [
        CreateUser,
      ],
      options: {
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
