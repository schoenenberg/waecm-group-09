import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { SubredditModel } from './subreddit.model';
import { RedditService } from './reddit.service';
import { NewSubredditInput } from './dto/new-subreddit.input';
import { UpdateSubredditInput } from './dto/update-subreddit.input';

@Resolver(() => SubredditModel)
export class RedditResolver {
  constructor(private readonly redditService: RedditService) {
  }

  // THIS IS JUST FOR TESTING ---- delete later --------------------------------
  @Query(() => SubredditModel)
  @UseGuards(GqlAuthGuard)
  subreddit(): SubredditModel {
    return {
      _id: 'gfdsdfgsdfg',
      name: '/r/reactjs-testData',
      description: 'sample description',
      icon: 'https://api.adorable.io/avatars/285/abott@adorable.png',
      answeredCommentIDs: ['1', '2', '3'],
      active: false,
      answer: 'test Answer',
      keywords: ['first', 'hello', 'last'],
      createdOn: new Date(Date.now()),
    };
  }

  // ---------------------------------------------------------------------------

  @Query(() => [SubredditModel])
  async allSubreddits() {
    // TODO: answerCount is not returned, as it is stored in an array
    return this.redditService.findAll();
  }

  @Mutation(() => SubredditModel)
  async getSubreddit(@Args('_id') id: string) {
    const subreddit = await this.redditService.readOne(id);
    return {
      ...subreddit,
      answerCount: subreddit.answeredCommentIDs.length,
    };
  }

  @Mutation(() => SubredditModel)
  async updateSubreddit(
    @Args('_id') id: string,
    @Args('input') subredditInput: UpdateSubredditInput,
  ) {
    const updatedSubreddit = await this.redditService.update(
      id,
      subredditInput,
    );
    return {
      ...updatedSubreddit,
      answerCount: updatedSubreddit.answeredCommentIDs.length,
    };
  }

  @Mutation(() => SubredditModel)
  async createNewSubreddit(
    @Args('input')
      subredditInput: NewSubredditInput,
  ) {
    return await this.redditService.createSubreddit(subredditInput);
  }

  @Mutation(() => SubredditModel)
  async deleteSubreddit(
    @Args('_id')
      id: string,
  ) {
    return await this.redditService.delete(id);
  }
}
