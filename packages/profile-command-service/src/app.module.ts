import { Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { CommandsModule } from './commands';

@Module({
  imports: [
    CqrsMicroservicesModule.install(),
    CommandsModule,
  ],
})
export class AppModule {}
