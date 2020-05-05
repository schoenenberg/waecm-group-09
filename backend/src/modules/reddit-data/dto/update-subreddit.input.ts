import { Field, InputType } from '@nestjs/graphql';
import { Length, IsOptional } from 'class-validator';

@InputType()
export class UpdateSubredditInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 30)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 300)
  answer?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @Length(1, 30, {
    each: true
  })
  keywords?: string[];

  @Field({ nullable: true })
  @IsOptional()
  active?: boolean;
}
