// tslint:disable: ban-types
import { Type } from '@nestjs/common';
import { ICommand, IEvent, IQuery } from '@nestjs/cqrs';
import { ClientOptions } from '@nestjs/microservices';

export interface ICQRSMicroservicesRegisterOptions {
  readonly commands?: Array<Type<ICommand>>;
  readonly events?: Array<Type<IEvent>>;
  readonly queries?: Array<Type<IQuery>>;
  readonly options: ClientOptions;
}
