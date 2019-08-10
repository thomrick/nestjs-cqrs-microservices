import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppRepository } from './app.repository';
import { CreateUserDto } from './dto';
import { IUser, User } from './models';

@Injectable()
export class AppService {
  private readonly repository: AppRepository;

  constructor(repository: AppRepository) {
    this.repository = repository;
  }

  public create(dto: CreateUserDto): Observable<IUser> {
    const user: IUser = new User(dto.name, dto.name);
    return this.repository.save(user).pipe(
      map(() => user),
    );
  }
}
