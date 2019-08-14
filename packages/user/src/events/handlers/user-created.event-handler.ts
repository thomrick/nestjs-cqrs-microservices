import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreated } from '../user-created.event';

@EventsHandler(UserCreated)
export class UserCreatedHandler implements IEventHandler<UserCreated> {
  public handle(event: UserCreated) {
    console.log(UserCreatedHandler.name);
  }
}
