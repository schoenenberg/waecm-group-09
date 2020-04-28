import { Injectable } from '@nestjs/common';
import * as Snoowrap from 'snoowrap';
import { Subreddit, Listing, Comment } from 'snoowrap';

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

  // Returns all details about the specified Subreddit
  public subredditDetails(subredditName: string): Promise<Subreddit> {
    return this.redditClient.getSubreddit(subredditName).fetch();
  }

  public subredditComments(
    subredditName: string,
    limit: number,
  ): Promise<Listing<Comment>> {
    return this.redditClient
      .getSubreddit(subredditName)
      .getNewComments({ limit: limit });
  }
}
