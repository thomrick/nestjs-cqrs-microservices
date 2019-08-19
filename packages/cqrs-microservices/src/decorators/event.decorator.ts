// tslint:disable: ban-types
import { Serializable, SerializableOptions } from 'ts-json-serializer';

export function Event(options?: SerializableOptions) {
  return (target: Function) => {
    Serializable(options)(target);
  };
}
