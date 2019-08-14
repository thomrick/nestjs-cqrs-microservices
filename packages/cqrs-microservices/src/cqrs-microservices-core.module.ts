import { DynamicModule, Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { CommandBus } from './bus';
import { COMMAND_BUS_CLIENT_TOKEN } from './constantes';

@Global()
@Module({})
export class CqrsMicroservicesCoreModule extends CqrsModule {
  public static forRoot(options?: MicroserviceOptions): DynamicModule {
    return {
      module: CqrsMicroservicesCoreModule,
      imports: [
        ClientsModule.register([
          this.registerCommandBusClient(options),
        ]),
      ],
      providers: [
        CommandBus,
      ],
      exports: [
        CommandBus,
      ],
    };
  }

  private static registerCommandBusClient(options: MicroserviceOptions = { transport: Transport.TCP })
  : ClientProviderOptions {
    return {
      name: COMMAND_BUS_CLIENT_TOKEN,
      ...options,
    } as ClientProviderOptions;
  }
}
