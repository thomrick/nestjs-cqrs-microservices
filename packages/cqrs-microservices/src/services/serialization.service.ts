import { Injectable } from '@nestjs/common';
import { TsSerializer } from 'ts-json-serializer';
import { Instance } from '../common';

@Injectable()
export class SerializationService {
  private readonly serializer: TsSerializer = new TsSerializer();

  public serialize(obj: Instance<any>): Instance<any> {
    return JSON.parse(this.serializer.serialize(obj));
  }

  public deserialize(obj: Instance<any>): Instance<any> {
    return this.serializer.deserialize(JSON.stringify(obj));
  }
}
