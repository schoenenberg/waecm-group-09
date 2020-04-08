import { Module } from '@nestjs/common';
import { RedditResolver } from './reddit.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [RedditResolver],
  imports: [AuthModule],
})
export class RedditModule {}