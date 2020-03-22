import { Module } from '@nestjs/common';
import { HelloworldResolver } from './helloworld.resolver';

@Module({
  providers: [HelloworldResolver],
})
export class HelloworldModule {}
