// tslint:disable: max-line-length max-classes-per-file
import { Event } from '../decorators';
import { SerializationService } from './serialization.service';

describe('SerializationService', () => {
  const serializer = new SerializationService();

  @Event()
  class A {
    public name: string = 'Hello';
  }
  const serialized = '{"__type":"A","__value":{"name":{"__type":"String","__value":"Hello"}}}';
  const a = JSON.parse(serialized);

  it('should return a string', () => {
    expect(serializer.serialize(new A())).toEqual(a);
  });

  it('should deserialize the object', () => {
    const deserialized = serializer.deserialize(a);
    expect(deserialized).toEqual(new A());
    expect(deserialized instanceof A).toBeTruthy();
  });
});
