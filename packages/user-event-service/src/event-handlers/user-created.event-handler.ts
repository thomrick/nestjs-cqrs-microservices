import { IEventHandler } from '@nestjs/cqrs';
import { EventHandler } from '@nestjs/cqrs-microservices';
import { UserCreated } from '@user/core';

@EventHandler(UserCreated)
export class UserCreatedHandler implements IEventHandler<UserCreated> {
  public handle(event: UserCreated) {
    console.log(UserCreatedHandler.name, 'handle', event);
  }
}
