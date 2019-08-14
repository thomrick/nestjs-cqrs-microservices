import { AggregateRoot } from '@nestjs/cqrs';
import { ProfileCreated } from '../../events';

export class Profile extends AggregateRoot {
  private readonly id: string;
  private readonly user: string;

  constructor(id: string, user: string) {
    super();
    this.apply(new ProfileCreated(id, user));
    this.id = id;
    this.user = user;
  }
}
