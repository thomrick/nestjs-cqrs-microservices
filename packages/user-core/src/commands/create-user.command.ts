import { Command } from '@nestjs/cqrs-microservices';

@Command({
  factory: (data: any) => new CreateUser(data.email, data.password, data.username) as any,
})
export class CreateUser {
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
