import { Field, InputType } from '@nestjs/graphql';
import { Length, IsDate} from 'class-validator';

@InputType()
export class NewSubredditInput {
  @Field()
  @Length(3, 20)
  name!: string;

  @Field()
  @Length(2, 300)
  answer!: string;

  @Field(() => [String])
  @Length(2, 30, {
    each: true
  })
  keywords!: string[];

  @Field()
  active!: boolean;

  @Field()
  @IsDate()
  createdOn!: Date;
}
