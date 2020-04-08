import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RedditModel {
  @Field()
  link!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  answerCount?: number;
}
