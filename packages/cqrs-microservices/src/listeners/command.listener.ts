import { Controller, OnModuleInit, Type } from '@nestjs/common';
import { CommandBus, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { COMMAND_HANDLER_METADATA } from '@nestjs/cqrs/dist/decorators/constants';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Instance } from '../common';
import { COMMAND_LISTENER_MESSAGE_PATTERN } from '../contants';
import { RemoteCommandHandler } from '../handlers';
import { SerializationService } from '../services';

@Controller()
export class CommandListener implements OnModuleInit {
  private readonly unhandled: string[] = [];
  private readonly explorer: ExplorerService;
  private readonly bus: CommandBus;
  private readonly serializer: SerializationService;

  constructor(explorer: ExplorerService, bus: CommandBus, serializer: SerializationService) {
    this.explorer = explorer;
    this.bus = bus;
    this.serializer = serializer;
  }

  public onModuleInit(): void {
    const { commands } = this.explorer.explore();
    this.registerUnhandled(commands);
  }

  private registerUnhandled(handlers: Array<Type<ICommandHandler>> = []): void {
    handlers
      .filter((handler) => handler.prototype instanceof RemoteCommandHandler)
      .forEach((handler) => {
        const handled: Type<ICommand> | undefined = Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler);
        if (!!handled) {
          this.unhandled.push(handled.name);
        }
      });
  }

  @MessagePattern(COMMAND_LISTENER_MESSAGE_PATTERN)
  public listen(input: Instance<any>): Observable<any> {
    try {
      return this.handle(input);
    } catch {
      return of().pipe(delay(100000));
    }
  }

  private handle(input: Instance<any>): Observable<any> {
    const command: Instance<ICommand> = this.serializer.deserialize(input);
    if (this.shouldHandle(command)) {
      return from(this.bus.execute(command));
    }
    throw new Error();
  }

  private shouldHandle(command: Instance<ICommand>): boolean {
    return !this.unhandled.find((current) => current === command.constructor.name);
  }
}
