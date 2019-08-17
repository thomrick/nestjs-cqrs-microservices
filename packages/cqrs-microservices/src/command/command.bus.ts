import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandBus as CqrsCommandBus, ICommand } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CommandBus extends CqrsCommandBus {
  private readonly broker: ClientProxy;

  constructor(ref: ModuleRef, @Inject('MESSAGE_BROKER') broker: ClientProxy) {
    super(ref);
    this.broker = broker;
  }

  // tslint:disable-next-line: ban-types
  public execute(command: ICommand & Object): Promise<any> {
    try {
      return super.execute(command);
    } catch {
      return this.broker.send(command.constructor.name, command).toPromise();
    }
  }
}
