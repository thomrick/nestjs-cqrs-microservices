import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SerializationService } from '../services';
import { CQRS_MICROSERVICES_COMMAND } from './constantes';

@Controller()
export class CQRSMicroservicesCommandController {
  private readonly bus: CommandBus;
  private readonly serializer: SerializationService;

  constructor(bus: CommandBus, serializer: SerializationService) {
    this.bus = bus;
    this.serializer = serializer;
  }

  @MessagePattern(CQRS_MICROSERVICES_COMMAND)
  public handle(command: any): Observable<any> | void {
    try {
      return from(this.bus.execute(this.serializer.deserialize(command)));
    } catch {
      return of().pipe(delay(10000));
    }
  }
}
