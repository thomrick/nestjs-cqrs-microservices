import { CommandHandler } from '@nestjs/cqrs';
import { RemoteCommandHandler } from '@nestjs/cqrs-microservices';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateProfile } from '@profile/core';

@CommandHandler(CreateProfile)
export class CreateProfileHandler extends RemoteCommandHandler<CreateProfile> {
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
