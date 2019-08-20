import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUser } from '@user/core';
import { from, Observable } from 'rxjs';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  private readonly commands: CommandBus;

  constructor(commands: CommandBus) {
    this.commands = commands;
  }

  @Post()
  public create(@Body() dto: CreateUserDto): Observable<any> {
    return from(this.commands.execute(new CreateUser(dto.email, dto.password, dto.username)));
  }
}
