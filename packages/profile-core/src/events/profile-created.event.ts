import { Event } from '@nestjs/cqrs-microservices';

@Event({
  factory: (data: ProfileCreated) => new ProfileCreated(data.id, data.user) as any,
})
export class ProfileCreated {
  public readonly id: string;
  public readonly user: string;

  constructor(id: string, user: string) {
    this.id = id;
    this.user = user;
  }
}
