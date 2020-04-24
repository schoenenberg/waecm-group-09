import { Injectable } from '@nestjs/common';
import { RedditConnector } from '../reddit-connector/reddit-connector.service';

@Injectable()
export class RedditBotService {
  constructor(
    private redditClient: RedditConnector
  ) {}


  // just for testing - delete later
  public getRedditClient(): void {
    console.log(this.redditClient);
  }

}