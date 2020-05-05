import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class NewSubredditInput {
  @Field()
  @Length(1, 30)
  name!: string;

  @Field()
  @Length(1, 300)
  answer!: string;

  @Field(() => [String])
  @Length(1, 30, {
    each: true
  })
  keywords!: string[];

  @Field()
  active!: boolean;

  @Field()
  createdOn!: Date;
}
