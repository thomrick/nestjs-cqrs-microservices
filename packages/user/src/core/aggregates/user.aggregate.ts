import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreated } from '../../events';

export class User extends AggregateRoot {
  private readonly id: string;
  private email: string;
  private password: string;
  private username: string;

  constructor(id: string, email: string, password: string, username: string) {
    super();
    this.apply(new UserCreated(id, email, password, username));
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
