// tslint:disable: ban-types
import { INestMicroservice } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { UserCreated } from '@user/core';
import { AppModule } from '../src/app.module';
import { UserCreatedHandler } from '../src/event-handlers/user-created.event-handler';

describe('User Event Service (e2e)', () => {
  let application: INestMicroservice;
  let client: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .compile();
    application = module.createNestMicroservice({ transport: Transport.TCP });
    client = ClientProxyFactory.create({ transport: Transport.TCP });
    await application.listenAsync();
  });

  afterEach(async () => {
    await client.close();
    await application.close();
  });

  xit('should handle UserCreated event', async () => {
    const handler = application.get(UserCreatedHandler);
    console.log(handler);
    spyOn(handler, 'handle');
    const event: UserCreated & Object = new UserCreated('id', 'email', 'password', 'username');

    await client.send(event.constructor.name, event);

    expect(handler.handle).toHaveBeenCalledWith(event);
  });
});
