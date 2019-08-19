import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { Transport } from '@nestjs/microservices';
import { UserSagas } from './sagas';

@Module({
  imports: [
    CqrsMicroservicesModule.connect({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    }),
  ],
  providers: [
    UserSagas,
  ],
})
export class AppModule {}
