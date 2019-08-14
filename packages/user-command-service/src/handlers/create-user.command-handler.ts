import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs-microservices';
import { CreateUser, User } from '@user/core';
import uuid from 'uuid/v1';

@CommandHandler(CreateUser)
export class CreateUserHandler implements ICommandHandler<CreateUser> {
  private readonly publisher: EventPublisher;

  constructor(publisher: EventPublisher) {
    this.publisher = publisher;
  }

  public async execute(command: CreateUser): Promise<any> {
    const { email, password, username } = command;
    const UserModel = this.publisher.mergeClassContext(User);
    const user = new UserModel(uuid(), email, password, username);
    user.commit();
    return user;
  }
}
