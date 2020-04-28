import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class UpdateSubredditInput {
  @Field({ nullable: true })
  @MaxLength(40)
  name?: string;

  @Field({ nullable: true })
  answer?: string;

  @Field(() => [String], { nullable: true })
  keywords?: string[];

  @Field({ nullable: true })
  active?: boolean;

  @Field()
  username!: string;
}
