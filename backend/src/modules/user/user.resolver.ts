import { Query, Resolver } from '@nestjs/graphql';
import { UserType } from './models/userType';
import { GqlAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from "./user.decorator";
import { User } from "../../types/user";

@Resolver(() => UserType)
export class UserResolver {
  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  currentUser(@CurrentUser() user: User): UserType {
    return {
      username: user.preferred_username,
      picture: user.picture,
    };
  }
}
