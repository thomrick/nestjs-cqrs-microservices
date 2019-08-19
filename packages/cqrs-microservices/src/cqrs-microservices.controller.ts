// tslint:disable: ban-types
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EventBus } from './event';
import { SerializationService } from './services';

@Controller()
export class CqrsMicroservicesController {
  private readonly bus: EventBus;
  private readonly serializer: SerializationService;

  constructor(bus: EventBus, serializer: SerializationService) {
    this.bus = bus;
    this.serializer = serializer;
  }

  @EventPattern('CQRS_SAGA_CONTROLLER')
  public listen(event: Object): void {
    this.bus.publisher.publish(this.serializer.deserialize(event));
  }
}
