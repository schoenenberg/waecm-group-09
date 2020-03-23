import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { GqlAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from "./user.decorator";
import { User } from "../../types/user";

@Resolver(() => UserModel)
export class UserResolver {
  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  currentUser(@CurrentUser() user: User): UserModel {
    return {
      username: user.preferred_username,
      picture: user.picture,
    };
  }
}
