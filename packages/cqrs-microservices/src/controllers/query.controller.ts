import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SerializationService } from '../services';
import { CQRS_MICROSERVICE_QUERY } from './constantes';

@Controller()
export class CQRSMicroservicesQueryController {
  private readonly bus: QueryBus;
  private readonly serializer: SerializationService;

  constructor(bus: QueryBus, serializer: SerializationService) {
    this.bus = bus;
    this.serializer = serializer;
  }

  @MessagePattern(CQRS_MICROSERVICE_QUERY)
  public handle(query: any): Observable<any> {
    try {
      return from(this.bus.execute(this.serializer.deserialize(query)));
    } catch {
      return of().pipe(delay(10000));
    }
  }
}
