import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from '../auth/auth.guard';
import { SubredditModel } from './subreddit.model';
import { RedditService } from './reddit.service';
import { NewSubredditInput } from './dto/new-subreddit.input';
import { UpdateSubredditInput } from './dto/update-subreddit.input';

@Resolver(() => SubredditModel)
export class RedditResolver {
  constructor(private readonly redditService: RedditService) {}

  @Query(() => [SubredditModel])
  async allSubreddits() {
    return this.redditService.findAll();
  }

  @Mutation(() => SubredditModel)
  async getSubreddit(@Args('_id') id: string) {
    return await this.redditService.readOne(id);
  }

  @Mutation(() => SubredditModel)
  async updateSubreddit(
    @Args('_id') id: string,
    @Args('input') subredditInput: UpdateSubredditInput,
  ) {
    return await this.redditService.update(id, subredditInput);
  }

  @Mutation(() => SubredditModel)
  async createNewSubreddit(@Args('input') subredditInput: NewSubredditInput) {
    return await this.redditService.createSubreddit(subredditInput);
  }

  @Mutation(() => SubredditModel)
  async deleteSubreddit(@Args('_id') id: string) {
    return await this.redditService.delete(id);
  }
}
