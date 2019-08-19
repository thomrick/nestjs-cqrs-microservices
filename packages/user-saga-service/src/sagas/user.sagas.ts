import { Injectable } from '@nestjs/common';
import { ICommand, Saga } from '@nestjs/cqrs';
import { ofType } from '@nestjs/cqrs';
import { CreateProfile } from '@profile/core';
import { UserCreated } from '@user/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserSagas {
  @Saga()
  public readonly userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreated),
      map((event) => new CreateProfile(event.id)),
    );
  }
}
