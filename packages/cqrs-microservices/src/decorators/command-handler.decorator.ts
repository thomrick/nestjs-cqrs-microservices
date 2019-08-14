// tslint:disable: ban-types max-line-length
import { Controller } from '@nestjs/common';
import { CommandHandler as CqrsCommandHandler, ICommand } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

export function CommandHandler(command: ICommand & Function): ClassDecorator {
  return (target: Function) => {
    CqrsCommandHandler(command)(target);
    Controller()(target);
    MessagePattern(command.prototype.constructor.name)(target, 'execute', Reflect.getOwnPropertyDescriptor(target.prototype, 'execute')!);
  };
}
