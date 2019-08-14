import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs-microservices';
import { CreateUser } from 'user';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  private readonly commands: CommandBus;

  constructor(commands: CommandBus) {
    this.commands = commands;
  }

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<any> {
    return this.commands.execute(new CreateUser(dto.email, dto.password, dto.username));
  }
}
