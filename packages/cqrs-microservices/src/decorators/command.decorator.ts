// tslint:disable: ban-types
import { Serializable, SerializableOptions } from 'ts-json-serializer';

export function Command(options?: SerializableOptions): ClassDecorator {
  return (target: Function) => {
    Serializable(options)(target);
  };
}
