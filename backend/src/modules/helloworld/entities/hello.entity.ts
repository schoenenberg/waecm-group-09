import {Field, ObjectType} from "@nestjs/graphql"

@ObjectType()
export class HelloEntity {
    @Field()
    hello!: string

    @Field({nullable: true})
    foo?: string
}