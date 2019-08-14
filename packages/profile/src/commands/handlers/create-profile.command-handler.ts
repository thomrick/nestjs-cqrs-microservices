import { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs-microservices';
import { CreateProfile } from '../create-profile.command';

@CommandHandler(CreateProfile)
export class CreateProfileHandler implements ICommandHandler<CreateProfile> {
  public async execute(command: CreateProfile): Promise<any> {
    console.log(CreateProfile.name);
  }
}
