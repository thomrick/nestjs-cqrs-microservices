import { Controller, OnModuleInit, Type } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryBus } from '@nestjs/cqrs';
import { QUERY_HANDLER_METADATA } from '@nestjs/cqrs/dist/decorators/constants';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Instance } from '../common';
import { QUERY_LISTENER_MESSAGE_PATTERN } from '../contants';
import { RemoteQueryHandler } from '../handlers';
import { SerializationService } from '../services';

@Controller()
export class QueryListener implements OnModuleInit {
  private readonly unhandled: string[] = [];
  private readonly explorer: ExplorerService;
  private readonly bus: QueryBus;
  private readonly serializer: SerializationService;

  constructor(explorer: ExplorerService, bus: QueryBus, serializer: SerializationService) {
    this.explorer = explorer;
    this.bus = bus;
    this.serializer = serializer;
  }

  public onModuleInit(): void {
    const { queries } = this.explorer.explore();
    this.registerUnhandled(queries);
  }

  private registerUnhandled(handlers: Array<Type<IQueryHandler>> = []): void {
    handlers.filter((handler) => handler.prototype instanceof RemoteQueryHandler).forEach((handler) => {
      const handled: Type<IQuery> | undefined = Reflect.getMetadata(QUERY_HANDLER_METADATA, handler);
      if (!!handled) {
        this.unhandled.push(handled.name);
      }
    });
  }

  @MessagePattern(QUERY_LISTENER_MESSAGE_PATTERN)
  public listen(input: Instance<any>): Observable<any> {
    try {
      return this.handle(input);
    } catch {
      return of().pipe(delay(10000));
    }
  }

  private handle(input: Instance<any>): Observable<any> {
    const query: Instance<IQuery> = this.serializer.deserialize(input);
    if (this.shouldHandle(query)) {
      return from(this.bus.execute(query));
    }
    throw new Error();
  }

  private shouldHandle(query: Instance<IQuery>): boolean {
    return !this.unhandled.find((current) => current === query.constructor.name);
  }
}
