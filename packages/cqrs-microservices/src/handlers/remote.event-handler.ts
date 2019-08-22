// tslint:disable: no-empty
import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IEvent, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Subscription } from 'rxjs';
import { Instance } from '../common';
import { EVENT_LISTENER_EVENT_PATTERN } from '../contants';
import { SerializationService } from '../services';

function noop() {}

@Injectable()
export abstract class RemoteEventHandler<T extends IEvent> implements IEventHandler<T> {
  protected readonly ref: ModuleRef;
  protected abstract readonly proxy: ClientProxy;
  private readonly serializer: SerializationService;

  constructor(ref: ModuleRef, serializer: SerializationService) {
    this.ref = ref;
    this.serializer = serializer;
    this.installProxy();
  }

  public handle(event: Instance<T>) {
    const subscription: Subscription = this.proxy
      .emit(EVENT_LISTENER_EVENT_PATTERN, this.serializer.serialize(event))
      .subscribe(noop, noop, () => subscription.unsubscribe());
  }

  protected abstract installProxy(): void;
}
