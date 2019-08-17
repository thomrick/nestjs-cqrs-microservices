import { DynamicModule, Global, Module } from '@nestjs/common';
import { CqrsModule, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import { ClientsModule, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CommandBus } from './command';
import { EventBus } from './event';

@Global()
@Module({})
export class CqrsMicroservicesModule extends CqrsModule {
  public static connect(options: MicroserviceOptions = { transport: Transport.TCP }): DynamicModule {
    return {
      module: CqrsMicroservicesModule,
      imports: [
        ClientsModule.register([{
          name: 'MESSAGE_BROKER',
          ...options as any,
        }]),
      ],
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        ExplorerService,
        QueryBus,
      ],
      exports: [
        CommandBus,
        EventBus,
        EventPublisher,
        QueryBus,
      ],
    };
  }
}
