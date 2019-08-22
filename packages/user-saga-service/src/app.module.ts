import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { CommandsModule } from './commands';
import { SagasModule } from './sagas';

@Module({
  imports: [
    CqrsMicroservicesModule.install(),
    SagasModule,
    CommandsModule,
  ],
})
export class AppModule {}
