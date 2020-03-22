import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HelloModel {
  @Field()
  hello!: string;

  @Field({ nullable: true })
  foo?: string;
}
