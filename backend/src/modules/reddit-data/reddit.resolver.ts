import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { SubredditModel } from './subreddit.model';
import { RedditService } from './reddit.service';
import { NewSubredditInput } from './dto/new-subreddit.input';
import { UpdateSubredditInput } from './dto/update-subreddit.input';
import { CurrentUser } from '../user/user.decorator';
import { User } from '../../types/user';

@Resolver(() => SubredditModel)
export class RedditResolver {
  constructor(private readonly redditService: RedditService) {}

  @Query(() => [SubredditModel])
  @UseGuards(GqlAuthGuard)
  async allSubreddits(@CurrentUser() user: User) {
    return this.redditService.findAllForUser(user);
  }

  @Mutation(() => SubredditModel)
  @UseGuards(GqlAuthGuard)
  async getSubreddit(@Args('_id') id: string, @CurrentUser() user: User) {
    return await this.redditService.readOne(id, user);
  }

  @Mutation(() => SubredditModel)
  @UseGuards(GqlAuthGuard)
  async updateSubreddit(
    @Args('_id') id: string,
    @Args('input') subredditInput: UpdateSubredditInput,
    @CurrentUser() user: User,
  ) {
    return await this.redditService.update(id, subredditInput, user);
  }

  @Mutation(() => SubredditModel)
  @UseGuards(GqlAuthGuard)
  async createNewSubreddit(
    @Args('input') subredditInput: NewSubredditInput,
    @CurrentUser() user: User,
  ) {
    return await this.redditService.createSubreddit(subredditInput, user);
  }

  @Mutation(() => SubredditModel)
  @UseGuards(GqlAuthGuard)
  async deleteSubreddit(@Args('_id') id: string, @CurrentUser() user: User) {
    return await this.redditService.delete(id, user);
  }
}
