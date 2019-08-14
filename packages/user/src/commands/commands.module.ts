import { forwardRef, Module } from '@nestjs/common';
import { CqrsMicroservicesModule } from '@nestjs/cqrs-microservices';
import { CommandHandlers } from './handlers';

@Module({
  imports: [
    forwardRef(() => CqrsMicroservicesModule),
  ],
  controllers: [
    ...CommandHandlers,
  ],
  providers: [
    ...CommandHandlers,
  ],
})
export class CommandsModule {}
