import { Command } from '@nestjs/cqrs-microservices';

@Command({
  factory: (data: CreateProfile) => new CreateProfile(data.user) as any,
})
export class CreateProfile {
  public readonly user: string;

  constructor(user: string) {
    this.user = user;
  }
}
