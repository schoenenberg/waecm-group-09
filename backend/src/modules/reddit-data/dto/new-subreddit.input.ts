import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewSubredditInput {
  @Field()
  @MaxLength(40)
  name!: string;

  @Field()
  answer!: string;

  @Field(() => [String])
  keywords!: string[];

  @Field()
  active!: boolean;

  @Field()
  createdOn!: Date;

  @Field()
  username!: string;
}
