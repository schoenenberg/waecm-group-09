import { Module } from '@nestjs/common';
import { RedditConnector } from './reddit-connector.service';

@Module({
  providers: [RedditConnector],
  exports: [RedditConnector]
})
export class RedditConnectorModule {}
