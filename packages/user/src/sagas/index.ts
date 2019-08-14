import { Provider } from '@nestjs/common';
import { UserSagas } from './user.sagas';

export const Sagas: Provider[] = [
  UserSagas,
];
