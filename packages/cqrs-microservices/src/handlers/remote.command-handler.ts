import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Instance } from '../common';
import { COMMAND_LISTENER_MESSAGE_PATTERN } from '../contants';
import { SerializationService } from '../services';

@Injectable()
export abstract class RemoteCommandHandler<T extends ICommand> implements ICommandHandler<T> {
  protected readonly ref: ModuleRef;
  protected abstract readonly proxy: ClientProxy;
  private readonly serializer: SerializationService;

  constructor(ref: ModuleRef, serializer: SerializationService) {
    this.ref = ref;
    this.serializer = serializer;
    this.installProxy();
  }

  public async execute(command: Instance<ICommand>): Promise<any> {
    return this.proxy.send(COMMAND_LISTENER_MESSAGE_PATTERN, this.serializer.serialize(command)).toPromise();
  }

  protected abstract installProxy(): void;
}
