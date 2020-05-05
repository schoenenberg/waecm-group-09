import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class AnsweredCommentIDsInput {

  @Field(() => [String])
  @Length(1, 10, {
    each: true
  })
  answeredCommentIDs!: string[];

}