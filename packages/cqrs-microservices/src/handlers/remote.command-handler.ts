import { OnModuleInit } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CQRS_MICROSERVICES_COMMAND } from '../controllers';
import { SerializationService } from '../services';

export class CQRSMicroservicesRemoteCommandHandler<T extends ICommand> implements ICommandHandler<T>, OnModuleInit {
  private readonly proxy: ClientProxy;
  private readonly serializer: SerializationService;

  constructor(proxy: ClientProxy, serializer: SerializationService) {
    this.proxy = proxy;
    this.serializer = serializer;
  }

  public async onModuleInit() {
    return this.proxy.connect();
  }

  public execute(command: T): Promise<any> {
    return this.proxy.send(CQRS_MICROSERVICES_COMMAND, this.serializer.serialize(command)).toPromise();
  }
}
