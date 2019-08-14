import { DynamicModule, Module } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { CqrsMicroservicesCoreModule } from './cqrs-microservices-core.module';

@Module({})
export class CqrsMicroservicesModule {
  public static forRoot(options?: MicroserviceOptions): DynamicModule {
    return {
      module: CqrsMicroservicesModule,
      imports: [
        CqrsMicroservicesCoreModule.forRoot(options),
      ],
      exports: [
        CqrsMicroservicesCoreModule,
      ],
    };
  }
}
