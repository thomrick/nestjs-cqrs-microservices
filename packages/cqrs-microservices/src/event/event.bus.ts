import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EventBus as CqrsEventBus, IEvent } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Subscription } from 'rxjs';
import { CommandBus } from '../command';

const noop = () => {
  // noop
};

@Injectable()
export class EventBus extends CqrsEventBus {
  private readonly broker: ClientProxy;

  constructor(ref: ModuleRef, commands: CommandBus, @Inject('MESSAGE_BROKER') broker: ClientProxy) {
    super(commands, ref);
    this.broker = broker;
  }
  // tslint:disable-next-line: ban-types
  public publish(event: IEvent & Object): void {
    super.publish(event);
    const subscription: Subscription = this.broker
      .emit(event.constructor.name, event)
      .subscribe(noop, noop, () => subscription.unsubscribe());
  }
}
