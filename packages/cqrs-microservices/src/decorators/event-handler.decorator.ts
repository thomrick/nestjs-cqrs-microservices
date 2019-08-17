// tslint:disable: ban-types
import { Controller } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';

export function EventHandler(event: Function): ClassDecorator {
  return (target: Function) => {
    EventsHandler(event)(target);
    Controller()(target);
    EventPattern(event.name)(target, 'handle', Reflect.getOwnPropertyDescriptor(target.prototype, 'handle')!);
  };
}
