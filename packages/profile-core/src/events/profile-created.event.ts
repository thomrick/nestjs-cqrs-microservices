export class ProfileCreated {
  public readonly id: string;
  public readonly user: string;

  constructor(id: string, user: string) {
    this.id = id;
    this.user = user;
  }
}
