import { Injectable } from '@nestjs/common';
import Snoowrap = require('snoowrap');
import { Subreddit } from 'snoowrap';

@Injectable()
export class RedditConnector {
  private redditClient: Snoowrap;

  constructor() {
    this.redditClient = new Snoowrap({
      userAgent: 'bot from /u/' + process.env.REDDIT_USERNAME,
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    });
  }

  /// Returns all details about the specified Subreddit
  public subredditDetails(subredditName: string): Subreddit {
    return this.redditClient.getSubreddit(subredditName);
  }
}
