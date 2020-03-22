import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  username!: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  family_name?: string;

  @Field({ nullable: true })
  given_name?: string;

}
