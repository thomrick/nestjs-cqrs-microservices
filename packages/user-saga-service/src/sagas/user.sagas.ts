import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { CreateProfile } from '@profile/core';
import { UserCreated } from '@user/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserSagas {
  @Saga()
  public userCreated = (events: Observable<IEvent>): Observable<ICommand> => {
    return events.pipe(
      ofType(UserCreated),
      map((event) => {
        console.log('user created', event.id, 'saga');
        return new CreateProfile(event.id);
      }),
    );
  }
}
