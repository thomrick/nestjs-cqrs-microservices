import { Event } from '@nestjs/cqrs-microservices';

export interface IUserCreated {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly username: string;
}

@Event({
  name: UserCreated.name,
  factory: (data: IUserCreated) => new UserCreated(data.id, data.email, data.password, data.username) as any,
})
export class UserCreated implements IUserCreated {
  public readonly id: string;
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;

  constructor(id: string, email: string, password: string, username: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
