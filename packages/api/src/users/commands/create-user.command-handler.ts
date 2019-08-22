import { CommandHandler } from '@nestjs/cqrs';
import { RemoteCommandHandler } from '@nestjs/cqrs-microservices';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateUser } from '@user/core';

@CommandHandler(CreateUser)
export class CreateUserHandler extends RemoteCommandHandler<CreateUser> {
  protected proxy!: ClientProxy;
  protected installProxy(): void {
    this.proxy = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }
}
