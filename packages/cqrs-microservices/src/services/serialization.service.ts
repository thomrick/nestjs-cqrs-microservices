import { Injectable } from '@nestjs/common';
import { TsSerializer } from 'ts-json-serializer';

@Injectable()
export class SerializationService {
  private readonly serializer = new TsSerializer();

  public serialize(serializable: any): any {
    return JSON.parse(this.serializer.serialize(serializable));
  }

  public deserialize(serializable: object): any {
    return this.serializer.deserialize(JSON.stringify(serializable));
  }
}
