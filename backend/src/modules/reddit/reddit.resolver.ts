import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { SubredditInfo } from './reddit.model';
import { RedditService } from './reddit.service';
import { NewSubredditInput } from './dto/new-subreddit.input';
import { UpdateSubredditInput } from './dto/update-subreddit.input';

@Resolver(() => SubredditInfo)
export class RedditResolver {
  constructor(private readonly redditService: RedditService) {}


  // THIS IS JUST FOR TESTING ---- delete later --------------------------------
  @Query(() => SubredditInfo)
  @UseGuards(GqlAuthGuard)
  subreddit(): SubredditInfo {
    return {
      _id: 'gfdsdfgsdfg',
      name: '/r/reactjs-testData',
      description: 'sample description',
      icon: 'https://api.adorable.io/avatars/285/abott@adorable.png',
      answerCount: 6,
      active: false,
      answer: 'test Answer',
      keywords: ['first', 'hello', 'last'],
    };
  }
  // ---------------------------------------------------------------------------

  @Query(() => [SubredditInfo])
  async allSubreddits() {
    return this.redditService.findAll();
  }

  @Mutation(() => SubredditInfo)
  async updateSubreddit(
    @Args('_id') id: string,
    @Args('input') subredditInput: UpdateSubredditInput,
  ) {
    return await this.redditService.update(id, subredditInput);
  }

  @Mutation(() => SubredditInfo)
  async createNewSubreddit(
    @Args('input')
    subredditInput: NewSubredditInput,
  ) {
    return await this.redditService.createSubreddit(subredditInput);
  }

  @Mutation(() => SubredditInfo)
  async deleteSubreddit(
    @Args('_id')
    id: string,
  ) {
    return await this.redditService.delete(id);
  }
}
