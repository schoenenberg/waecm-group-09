import { Injectable } from '@nestjs/common';
import { RedditConnector } from '../reddit-connector/reddit-connector.service';
import { RedditService } from '../reddit-data/reddit.service';
import { SubredditMongo } from '../reddit-data/interfaces/subreddit.interface';
import { Comment } from 'snoowrap';

@Injectable()
export class RedditBotService {
  // bot runs every few seconds and retrieves some comments
  private readonly SECONDS_UNTIL_UPDATE: number;
  private readonly COMMENT_LIMIT: number;

  constructor(
    private redditClient: RedditConnector,
    private readonly redditService: RedditService,
  ) {
    this.COMMENT_LIMIT = (process.env.REDDIT_BOT_COMMENT_LIMIT)
      ? parseInt(process.env.REDDIT_BOT_COMMENT_LIMIT) : 5;
    this.SECONDS_UNTIL_UPDATE = (process.env.REDDIT_BOT_INTERVAL)
      ? parseInt(process.env.REDDIT_BOT_INTERVAL) : 40;

    setInterval(() => this.startBot(), this.SECONDS_UNTIL_UPDATE * 1000);
  }

  public startBot(): void {
    this.getActiveSubreddits().then(allSubreddits =>
      allSubreddits.forEach(async subredditDB => {
        const redditComments = await this.getNewComments(subredditDB.name);

        // for testing: prints all new comments to the console
        console.log('---------------------------------');
        redditComments.map(redditComments =>
          console.log('COMMENT: ', redditComments.body),
        );

        const alreadyAnweredIDs = subredditDB.answeredCommentIDs;
        const keywords = subredditDB.keywords;

        const unansweredComments = await this.filterForUnansweredComments(
          alreadyAnweredIDs,
          redditComments,
        );

        const commentsWithKeywords = await this.filterForQuestionsWithKeywords(
          keywords,
          unansweredComments,
        );

        // reply to filtered comments (unanswered and with keywords)
        this.replyCommentsAndSaveID(commentsWithKeywords, subredditDB);
      }),
    );
  }

  private async getActiveSubreddits(): Promise<SubredditMongo[]> {
    return await this.redditService.getAllActive();
  }

  private async getNewComments(subredditName: string): Promise<Comment[]> {
    // avoids loops if keyword is in the answer -> only get comments where the bot is not the submitter
    return await this.redditClient
      .subredditComments(subredditName, this.COMMENT_LIMIT)
      .then(comments =>
        comments.filter(comment => comment /* !comment.is_submitter */),
      );
  }

  private async filterForUnansweredComments(
    alreadyAnweredIDs: string[],
    redditComments: Comment[],
  ): Promise<Comment[]> {
    return redditComments.filter(
      redditComment => !alreadyAnweredIDs.includes(redditComment.id),
    );
  }

  private async filterForQuestionsWithKeywords(
    keywords: string[],
    redditComments: Comment[],
  ) {
    const lowercasedKeywords = keywords.map(keyword => keyword.toLowerCase());

    return redditComments.filter(redditComment =>
      lowercasedKeywords.some(keyword => redditComment.body.includes(keyword)),
    );
  }

  private async replyCommentsAndSaveID(
    commentsToAnswer: Comment[],
    subredditDB: SubredditMongo,
  ) {
    const answer = subredditDB.answer;
    commentsToAnswer.forEach(comment => comment.reply(answer)
      .then((c) => {
        console.log('BOT: ' + c.id);
      }),
    );

    const id = subredditDB.id;
    const alreadyAnsweredIDs = subredditDB.answeredCommentIDs;
    const newCommentIDs = commentsToAnswer.map(comment => comment.id);

    const oldAndNewCommentIDs = alreadyAnsweredIDs.concat(newCommentIDs);

    await this.redditService.addNewAnsweredCommentIDs(id, {
      answeredCommentIDs: oldAndNewCommentIDs,
    });
  }
}
