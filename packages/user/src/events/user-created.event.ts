export class UserCreated {
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
