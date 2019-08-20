import { IEvent, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Subscription } from 'rxjs';
import { CQRS_MICROSERVICES_EVENT } from '../controllers';
import { SerializationService } from '../services';

// tslint:disable-next-line: no-empty
const noop = () => {};

export class CQRSMicroservicesRemoteEventHandler implements IEventHandler<IEvent> {
  private readonly proxy: ClientProxy;
  private readonly serializer: SerializationService;

  constructor(proxy: ClientProxy, serializer: SerializationService) {
    this.proxy = proxy;
    this.serializer = serializer;
  }

  public handle(event: IEvent) {
    const subscription: Subscription = this.proxy
      .emit(CQRS_MICROSERVICES_EVENT, this.serializer.serialize(event))
      .subscribe(noop, noop, () => subscription.unsubscribe());
  }
}
