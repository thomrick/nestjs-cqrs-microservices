// tslint:disable: ban-types no-empty max-line-length
import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EventBus as CqrsEventBus, IEvent } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Subscription } from 'rxjs';
import { CommandBus } from '../command';
import { SerializationService } from '../services';

const noop = () => {};

@Injectable()
export class EventBus extends CqrsEventBus {
  private readonly broker: ClientProxy;
  private readonly serializer: SerializationService;

  constructor(ref: ModuleRef, commands: CommandBus, @Inject('MESSAGE_BROKER') broker: ClientProxy, serializer: SerializationService) {
    super(commands, ref);
    this.broker = broker;
    this.serializer = serializer;
  }

  public publish(event: IEvent & Object): void {
    this.localHandlerPublish(event);
    this.remoteHandlerPublish(event);
    this.remoteControllerPublish(event);
  }

  private localHandlerPublish(event: IEvent): void {
    super.publish(event);
  }

  private remoteHandlerPublish(event: IEvent & Object): void {
    const handler: Subscription = this.broker
      .emit(event.constructor.name, event)
      .subscribe(noop, noop, () => handler.unsubscribe());
  }

  private remoteControllerPublish(event: IEvent): void {
    const controller: Subscription = this.broker
      .emit('CQRS_SAGA_CONTROLLER', this.serializer.serialize(event))
      .subscribe(noop, noop, () => controller.unsubscribe());
  }
}
