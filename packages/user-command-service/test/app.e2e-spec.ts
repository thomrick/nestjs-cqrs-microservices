// tslint:disable: ban-types
import { INestMicroservice } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUser } from '@user/core';
import { AppModule } from '../src/app.module';
import { CreateUserHandler } from '../src/command-handlers/create-user.command-handler';

describe('User Command Service (e2e)', () => {
  let client: ClientProxy;
  let module: TestingModule;
  let application: INestMicroservice;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
    .compile();
    application = module.createNestMicroservice({ transport: Transport.TCP });
    client = ClientProxyFactory.create({ transport: Transport.TCP });
    return await application.listenAsync();
  });

  afterEach(async () => {
    await client.close();
    await application.close();
    await module.close();
  });

  it('should handle CreateUser command', async () => {
    const handler: CreateUserHandler & Object = application.get(CreateUserHandler);
    spyOn(handler, 'execute');
    const command: CreateUser & Object = new CreateUser('email', 'password', 'username');

    await client.send((command as Object).constructor.name, command);

    expect(handler.execute).toHaveBeenCalledWith(command);
  });
});
