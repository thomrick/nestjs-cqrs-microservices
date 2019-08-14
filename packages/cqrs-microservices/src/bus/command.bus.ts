// tslint:disable: ban-types
import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandBus as CqrsCommandBus, ICommand } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { COMMAND_BUS_CLIENT_TOKEN } from '../constantes';

@Injectable()
export class CommandBus extends CqrsCommandBus {
  private readonly client: ClientProxy;

  constructor(
    moduleRef: ModuleRef,
    @Inject(COMMAND_BUS_CLIENT_TOKEN) client: ClientProxy) {
    super(moduleRef);
    this.client = client;
  }

  public execute<T extends ICommand>(command: T | Object): Promise<any> {
    try {
      return super.execute(command);
    } catch {
      return this.client.send((command as Object).constructor.name, command).toPromise();
    }
  }
}
