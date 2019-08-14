import { Module } from '@nestjs/common';
import { HandlersModule } from './handlers';

@Module({
  imports: [
    HandlersModule,
  ],
})
export class AppModule {}
