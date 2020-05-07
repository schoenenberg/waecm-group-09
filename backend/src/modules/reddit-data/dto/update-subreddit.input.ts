import { Field, InputType } from '@nestjs/graphql';
import { Length, IsOptional } from 'class-validator';

@InputType()
export class UpdateSubredditInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 20)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 300)
  answer?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @Length(2, 30, {
    each: true
  })
  keywords?: string[];

  @Field({ nullable: true })
  @IsOptional()
  active?: boolean;
  
  @Field()
  username!: string;
}
