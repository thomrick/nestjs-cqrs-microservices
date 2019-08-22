import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProfile } from '@profile/core';

@CommandHandler(CreateProfile)
export class CreateProfileHandler implements ICommandHandler<CreateProfile> {
  public async execute(command: CreateProfile): Promise<any> {
    console.log(CreateProfileHandler.name, 'exexcute', command);
  }
}
