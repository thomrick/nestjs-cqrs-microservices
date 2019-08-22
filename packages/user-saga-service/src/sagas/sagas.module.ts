import { Module } from '@nestjs/common';
import { UserSagas } from './user.sagas';

@Module({
  providers: [
    UserSagas,
  ],
})
export class SagasModule {}
