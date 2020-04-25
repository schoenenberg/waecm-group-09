import { Module } from '@nestjs/common';
import { RedditBotService } from './reddit-bot.service';
import { RedditConnectorModule } from "../reddit-connector/reddit-connector.module";
import { RedditModule } from "../reddit-data/reddit.module";

@Module({
  imports: [RedditConnectorModule, RedditModule],
  providers: [RedditBotService],
  exports: [RedditBotService],
})
export class RedditBotModule {}
