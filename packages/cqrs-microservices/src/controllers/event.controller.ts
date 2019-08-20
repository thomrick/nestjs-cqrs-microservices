import { Controller } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EventBus, IEvent } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { SerializationService } from '../services';
import { CQRS_MICROSERVICES_EVENT } from './constantes';

@Controller()
export class CQRSMicroservicesEventController {
  private readonly ref: ModuleRef;
  private readonly bus: EventBus;
  private readonly serializer: SerializationService;

  constructor(ref: ModuleRef, bus: EventBus, serializer: SerializationService) {
    this.ref = ref;
    this.bus = bus;
    this.serializer = serializer;
  }

  @EventPattern(CQRS_MICROSERVICES_EVENT)
  public handle(event: any): void {
    const deserialized: IEvent = this.serializer.deserialize(event);
    if (this.shouldHandle(deserialized)) {
      this.bus.publish(deserialized);
    }
  }

  private shouldHandle(event: object): boolean {
    try {
      return !this.ref.get(`${event.constructor.name}RemoteEventHandler`);
    } catch {
      return true;
    }
  }
}
