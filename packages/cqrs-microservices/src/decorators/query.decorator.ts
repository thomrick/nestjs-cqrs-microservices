// tslint:disable: ban-types
import { Serializable, SerializableOptions } from 'ts-json-serializer';

export function Query(options: SerializableOptions): ClassDecorator {
  return (target: Function) => {
    Serializable(options)(target);
  };
}
