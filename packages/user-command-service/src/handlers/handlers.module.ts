import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { Transport } from '@nestjs/microservices';
import { CreateUserHandler } from './create-user.command-handler';

@Module({
  imports: [
    CqrsMicroservicesModule.forRoot({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    }),
  ],
  controllers: [
    CreateUserHandler,
  ],
  providers: [
    CreateUserHandler,
  ],
})
export class HandlersModule {}
