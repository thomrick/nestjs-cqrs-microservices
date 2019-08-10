import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto';

@Controller()
export class AppController {
  @MessagePattern('CREATE_USER')
  public create(dto: CreateUserDto): Observable<any> {
    throw new Error('Method not implemented');
  }
}
