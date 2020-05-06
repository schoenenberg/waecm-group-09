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
  private readonly EXTRA_KEYWORD: string;
  private readonly ANSWERS_PER_RUN: number;

  constructor(
    private redditClient: RedditConnector,
    private readonly redditService: RedditService,
  ) {
    this.COMMENT_LIMIT = process.env.REDDIT_BOT_COMMENT_LIMIT
      ? parseInt(process.env.REDDIT_BOT_COMMENT_LIMIT)
      : 5;
    this.SECONDS_UNTIL_UPDATE = process.env.REDDIT_BOT_INTERVAL
      ? parseInt(process.env.REDDIT_BOT_INTERVAL)
      : 30;
    this.EXTRA_KEYWORD = process.env.REDDIT_BOT_EXTRA_KEYWORD
      ? process.env.REDDIT_BOT_EXTRA_KEYWORD
      : 'waecm-2020-group-09';
    this.ANSWERS_PER_RUN = process.env.REDDIT_BOT_ANSWERS_PER_RUN
      ? parseInt(process.env.REDDIT_BOT_ANSWERS_PER_RUN)
      : 1;

    setInterval(() => this.startBot(), this.SECONDS_UNTIL_UPDATE * 1000);
  }

  public startBot(): void {
    this.getActiveSubreddits().then(allSubreddits =>
      allSubreddits.forEach(async subredditDB => {
        const redditComments = await this.getNewComments(subredditDB.name);

        const alreadyAnsweredIDs = subredditDB.answeredCommentIDs;
        const keywords = subredditDB.keywords;

        const unansweredComments = await this.filterForUnansweredComments(
          alreadyAnsweredIDs,
          redditComments,
        );

        const commentsWithKeywords = await this.filterForCommentsWithKeywords(
          keywords,
          unansweredComments,
          this.EXTRA_KEYWORD,
        );

        // reply to filtered comments (unanswered and with keywords)
        await this.replyCommentsAndSaveID(
          commentsWithKeywords,
          subredditDB,
          this.ANSWERS_PER_RUN,
        );
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
    alreadyAnsweredIDs: string[],
    redditComments: Comment[],
  ): Promise<Comment[]> {
    return redditComments.filter(
      redditComment => !alreadyAnsweredIDs.includes(redditComment.id),
    );
  }

  private async filterForCommentsWithKeywords(
    keywords: string[],
    redditComments: Comment[],
    extraKeywordFilter?: string,
  ) {
    const lowercasedKeywords = keywords.map(keyword => keyword.toLowerCase());

    const commentsWithKeywords = redditComments.filter(redditComment =>
      lowercasedKeywords.some(keyword =>
        redditComment.body.toLowerCase().includes(keyword),
      ),
    );

    return extraKeywordFilter
      ? commentsWithKeywords.filter(comment =>
          comment.body.toLowerCase().includes(extraKeywordFilter),
        )
      : commentsWithKeywords;
  }

  private async replyCommentsAndSaveID(
    commentsToAnswer: Comment[],
    subredditDB: SubredditMongo,
    maxAnswers?: number,
  ) {
    const answer = subredditDB.answer;

    const maxCommentsToAnswer = maxAnswers
      ? commentsToAnswer.slice(0, maxAnswers)
      : commentsToAnswer;

    maxCommentsToAnswer.forEach(comment =>
      comment.reply(answer).then(c => {
        console.log('BOT: ' + c.id);
      }),
    );

    const id = subredditDB.id;
    const alreadyAnsweredIDs = subredditDB.answeredCommentIDs;
    const newCommentIDs = maxCommentsToAnswer.map(comment => comment.id);

    const oldAndNewCommentIDs = alreadyAnsweredIDs.concat(newCommentIDs);

    await this.redditService.addNewAnsweredCommentIDs(id, {
      answeredCommentIDs: oldAndNewCommentIDs,
    });
  }
}
