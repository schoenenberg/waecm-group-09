import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AnsweredCommentIDsInput {

  @Field(() => [String])
  answeredCommentIDs!: string[];

}