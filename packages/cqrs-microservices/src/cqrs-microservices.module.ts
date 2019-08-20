// tslint:disable: ban-types max-line-length
import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, ICommand, IEvent, QueryBus } from '@nestjs/cqrs';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { CQRSMicroservicesCommandController, CQRSMicroservicesEventController, CQRSMicroservicesQueryController } from './controllers';
import { CQRSMicroservicesRemoteCommandHandler, CQRSMicroservicesRemoteEventHandler, CQRSMicroservicesRemoteQueryHandler } from './handlers';
import { ICQRSMicroservicesRegisterOptions } from './options';
import { SerializationService } from './services';

@Global()
@Module({})
export class CqrsMicroservicesModule {
  public static connect(options?: ICQRSMicroservicesRegisterOptions): DynamicModule {
    const providers: Provider[] = !!options ? this.createRemoteProviders(options) : [];
    return {
      module: CqrsMicroservicesModule,
      imports: [
        CqrsModule,
      ],
      providers: [
        SerializationService,
        ...providers,
      ],
      controllers: [
        CQRSMicroservicesCommandController,
        CQRSMicroservicesEventController,
        CQRSMicroservicesQueryController,
      ],
      exports: [
        CqrsModule,
      ],
    };
  }

  public static register(options: ICQRSMicroservicesRegisterOptions): DynamicModule {
    return {
      module: CqrsMicroservicesModule,
      imports: [
        CqrsModule,
      ],
      providers: [
        SerializationService,
        ...this.createRemoteProviders(options),
      ],
      exports: [
        CqrsModule,
      ],
    };
  }

  private static createRemoteProviders(options: ICQRSMicroservicesRegisterOptions): Provider[] {
    const proxy: ClientProxy = ClientProxyFactory.create(options.options);
    const commands: Provider[] = !!options.commands ? options.commands.map((command) => this.createRemoteCommandProvider(command, proxy)) : [];
    const events: Provider[] = !!options.events ? options.events.map((event) => this.createRemoteEventProvider(event, proxy)) : [];
    const queries: Provider[] = !!options.queries ? options.queries.map((query) => this.createRemoteQueryProvider(query, proxy)) : [];
    return [
      ...commands,
      ...events,
      ...queries,
    ];
  }

  private static createRemoteCommandProvider(command: Type<ICommand>, proxy: ClientProxy): Provider {
    return {
      provide: `${command.name}RemoteCommandHandler`,
      useFactory: (bus: CommandBus, serializer: SerializationService) => {
        const handler = new CQRSMicroservicesRemoteCommandHandler(proxy, serializer);
        bus.bind(handler, command.name);
        return handler;
      },
      inject: [
        CommandBus,
        SerializationService,
      ],
    };
  }

  private static createRemoteEventProvider(event: Type<IEvent>, proxy: ClientProxy): Provider {
    return {
      provide: `${event.name}RemoteEventHandler`,
      useFactory: (bus: EventBus, serializer: SerializationService) => {
        const handler = new CQRSMicroservicesRemoteEventHandler(proxy, serializer);
        bus.bind(handler, event.name);
        return handler;
      },
      inject: [
        EventBus,
        SerializationService,
      ],
    };
  }

  private static createRemoteQueryProvider(query: Type<IEvent>, proxy: ClientProxy): Provider {
    return {
      provide: `${query.name}RemoteQueryHandler`,
      useFactory: (bus: QueryBus, serializer: SerializationService) => {
        const handler = new CQRSMicroservicesRemoteQueryHandler(proxy, serializer);
        bus.bind(handler, query.name);
        return handler;
      },
      inject: [
        QueryBus,
        SerializationService,
      ],
    };
  }
}
