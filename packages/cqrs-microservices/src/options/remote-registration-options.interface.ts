// tslint:disable: ban-types
import { Type } from '@nestjs/common';
import { ICommand, IEvent, IQuery } from '@nestjs/cqrs';
import { ClientOptions } from '@nestjs/microservices';

export interface IRemoteRegistrationOptions {
  readonly commands?: Array<Type<ICommand>>;
  readonly events?: Array<Type<IEvent>>;
  readonly queries?: Array<Type<IQuery>>;
  readonly remote: ClientOptions;
}
