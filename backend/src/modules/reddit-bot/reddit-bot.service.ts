import { Injectable } from '@nestjs/common';
import { RedditConnector } from '../reddit-connector/reddit-connector.service';
import { RedditService } from '../reddit-data/reddit.service';
import { Subreddit } from '../reddit-data/interfaces/subreddit.interface';

@Injectable()
export class RedditBotService {
  // bot runs every few seconds and retrieves some comments
  private readonly SECONDS_UNTIL_UPDATE: number = 10;
  private readonly COMMENT_LIMIT: number = 5;

  constructor(
    private redditClient: RedditConnector,
    private readonly redditService: RedditService,
  ) {
    setInterval(() => this.startBot(), this.SECONDS_UNTIL_UPDATE * 1000);
  }

  public startBot(): void {
    this.getActiveSubreddits().then(allSubreddits =>
      allSubreddits.forEach(async subreddit => {
        const comments = await this.getNewComments(subreddit.name);

        // for testing: prints the comments to the console
        console.log('---------------------------------');
        comments.map(comment => console.log('COMMENT: ', comment));
      }),
    );
  }

  public async getActiveSubreddits(): Promise<Subreddit[]> {
    return await this.redditService.getAllActive();
  }

  public async getNewComments(subredditName: string): Promise<string[]> {
    return await this.redditClient
      .subredditComments(subredditName, this.COMMENT_LIMIT)
      .then(comments => comments.map(comment => comment.body));
  }
}
