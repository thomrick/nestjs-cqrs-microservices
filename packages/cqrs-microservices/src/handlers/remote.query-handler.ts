import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { QUERY_LISTENER_MESSAGE_PATTERN } from '../contants';
import { SerializationService } from '../services';

@Injectable()
export abstract class RemoteQueryHandler<T extends IQuery> implements IQueryHandler<T> {
  protected readonly ref: ModuleRef;
  protected abstract readonly proxy: ClientProxy;
  private readonly serializer: SerializationService;

  constructor(ref: ModuleRef, serializer: SerializationService) {
    this.ref = ref;
    this.serializer = serializer;
    this.installProxy();
  }

  public async execute(query: T): Promise<any> {
    return this.proxy.send(QUERY_LISTENER_MESSAGE_PATTERN, this.serializer.serialize(query)).toPromise();
  }

  protected abstract installProxy(): void;
}
