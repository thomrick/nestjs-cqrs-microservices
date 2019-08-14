import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { CreateProfile } from 'profile';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCreated } from '../events';

@Injectable()
export class UserSagas {
  @Saga()
  public userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreated),
      map((event) => new CreateProfile(event.id)),
    );
  }
}
