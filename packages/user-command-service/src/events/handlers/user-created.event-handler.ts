import { EventsHandler } from '@nestjs/cqrs';
import { RemoteEventHandler } from '@nestjs/cqrs-microservices';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserCreated } from '@user/core';

@EventsHandler(UserCreated)
export class UserCreatedHandler extends RemoteEventHandler<UserCreated> {
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
