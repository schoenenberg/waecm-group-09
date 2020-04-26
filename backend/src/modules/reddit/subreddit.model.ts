import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubredditModel {
  @Field()
  _id!: string;

  @Field()
  name!: string;

  @Field(() => [String])
  keywords!: string[];

  @Field()
  answer!: string;

  @Field()
  active!: boolean;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  answerCount?: number;
}
