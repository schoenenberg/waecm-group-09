import { Module } from '@nestjs/common';
import { RedditBotService } from './reddit-bot.service';

@Module({
  providers: [RedditBotService],
  exports: [RedditBotService]
})
export class RedditBotModule {}
