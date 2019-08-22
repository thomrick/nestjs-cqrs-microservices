import { Controller, OnModuleInit, Type } from '@nestjs/common';
import { EventBus, IEvent, IEventHandler } from '@nestjs/cqrs';
import { EVENTS_HANDLER_METADATA } from '@nestjs/cqrs/dist/decorators/constants';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import { EventPattern } from '@nestjs/microservices';
import { Instance } from '../common';
import { EVENT_LISTENER_EVENT_PATTERN } from '../contants';
import { RemoteEventHandler } from '../handlers';
import { SerializationService } from '../services';

@Controller()
export class EventListener implements OnModuleInit {
  private readonly unhandled: string[] = [];
  private readonly explorer: ExplorerService;
  private readonly bus: EventBus;
  private readonly serializer: SerializationService;

  constructor(explorer: ExplorerService, bus: EventBus, serializer: SerializationService) {
    this.explorer = explorer;
    this.bus = bus;
    this.serializer = serializer;
  }

  public onModuleInit() {
    const { events } = this.explorer.explore();
    this.registerUnhandled(events);
  }

  private registerUnhandled(handlers: Array<Type<IEventHandler>> = []): void {
    handlers
      .filter((handler) => handler.prototype instanceof RemoteEventHandler)
      .forEach((handler) => {
        const handled: Array<Type<IEvent>> = Reflect.getMetadata(EVENTS_HANDLER_METADATA, handler) || [];
        this.unhandled.push(...handled.map((current) => current.name));
      });
  }

  @EventPattern(EVENT_LISTENER_EVENT_PATTERN)
  public listen(input: Instance<any>): void {
    try {
      this.handle(input);
    } catch {
      // nothing to implement
    }
  }

  private handle(input: Instance<any>): void {
    const event: Instance<IEvent> = this.serializer.deserialize(input);
    if (this.shouldHandle(event)) {
      this.bus.publish(event);
    }
  }

  private shouldHandle(event: Instance<IEvent>): boolean {
    return !this.unhandled.find((current) => current === event.constructor.name);
  }
}
