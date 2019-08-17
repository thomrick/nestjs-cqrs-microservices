// tslint:disable: ban-types
import { Controller } from '@nestjs/common';
import { CommandHandler as CqrsCommandHandler } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

export function CommandHandler(command: Function): ClassDecorator {
  return (target: Function) => {
    CqrsCommandHandler(command)(target);
    Controller()(target);
    MessagePattern(command.name)(target, 'execute', Reflect.getOwnPropertyDescriptor(target.prototype, 'execute')!);
  };
}
