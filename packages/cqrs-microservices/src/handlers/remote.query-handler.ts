import { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CQRS_MICROSERVICE_QUERY } from '../controllers';
import { SerializationService } from '../services';

export class CQRSMicroservicesRemoteQueryHandler implements IQueryHandler<IQuery> {
  private readonly proxy: ClientProxy;
  private readonly serializer: SerializationService;

  constructor(proxy: ClientProxy, serializer: SerializationService) {
    this.proxy = proxy;
    this.serializer = serializer;
  }

  public execute(query: IQuery): Promise<any> {
    return this.proxy.send(CQRS_MICROSERVICE_QUERY, this.serializer.serialize(query)).toPromise();
  }
}
