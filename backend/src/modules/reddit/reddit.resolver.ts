import { Query, Resolver } from '@nestjs/graphql';
import { RedditModel } from './reddit.model';
import { GqlAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => RedditModel)
export class RedditResolver {
  @Query(() => RedditModel)
  @UseGuards(GqlAuthGuard)
  subreddit(): RedditModel {
    return {
      link: "https://www.reddit.com/r/reactjs/",
      description: "A community for learning and developing web applications using React by Facebook.",
      icon: "https://api.adorable.io/avatars/285/abott@adorable.png",
      answerCount: 6,
    };
  }
}
