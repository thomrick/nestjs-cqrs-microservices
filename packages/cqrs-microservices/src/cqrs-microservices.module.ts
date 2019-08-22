// tslint:disable: ban-types max-line-length
import { DynamicModule, Global, Module } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import { CommandListener, EventListener, QueryListener } from './listeners';
import { SerializationService } from './services';

@Global()
@Module({
  providers: [
    CommandBus,
    EventBus,
    EventPublisher,
    QueryBus,
    ExplorerService,
    SerializationService,
  ],
  exports: [
    CommandBus,
    EventBus,
    EventPublisher,
    QueryBus,
    ExplorerService,
    SerializationService,
  ],
})
export class CqrsMicroservicesModule extends CqrsModule {
  public static install(): DynamicModule {
    return {
      module: CqrsMicroservicesModule,
      controllers: [
        CommandListener,
        EventListener,
        QueryListener,
      ],
    };
  }
}
