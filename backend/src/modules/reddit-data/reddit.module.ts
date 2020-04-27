import { Module } from '@nestjs/common';
import { RedditResolver } from './reddit.resolver';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubredditSchema } from '../../schemas/subreddit.schema';
import { RedditService } from "./reddit.service";
import { RedditConnectorModule } from '../reddit-connector/reddit-connector.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Subreddit', schema: SubredditSchema }]),
    RedditConnectorModule
  ],
  providers: [RedditResolver, RedditService],
  exports: [RedditService]
})
export class RedditModule {}
