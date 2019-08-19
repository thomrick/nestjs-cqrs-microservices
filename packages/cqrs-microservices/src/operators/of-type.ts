// tslint:disable: ban-types max-line-length
import { Type } from '@nestjs/common';
import { IEvent, ofType as ofTypeCqrs } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// export function ofType(...types: Object[]): Observable<IEvent> {
//   const metatypeOf = (event: Object) => !!types.find((type: Object) => Reflect.get(event, '__name__') === Reflect.get(type, '__name__'));
//   // const isInstanceOf = (event) => !!types.find(classType => event instanceof classType);
//   return (source: Observable<any>) => source.pipe(
//     filter(metatypeOf),
//   );
// }

// tslint:disable-next-line: array-type
export function ofType<TInput extends Object, TOutput extends IEvent>(...types: Type<TOutput>[]) {
  return (source: Observable<TInput>): Observable<TOutput> => source.pipe(
    ofTypeCqrs(...types),
  );
}
