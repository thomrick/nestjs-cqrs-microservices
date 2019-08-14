import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { Transport } from '@nestjs/microservices';
import { CreateProfileHandler } from './create-profile.command-handler';

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
    CreateProfileHandler,
  ],
  providers: [
    CreateProfileHandler,
  ],
})
export class HandlersModule {}
