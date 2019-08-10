import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { IUser } from './models/user.interface';

@Injectable()
export class AppRepository {
  private readonly database: IUser[] = [];

  public save(user: IUser): Observable<void> {
    return of();
  }
}
