import {Parent, Query, ResolveField, Resolver} from "@nestjs/graphql"
import {HelloEntity} from "./entities/hello.entity"

@Resolver(() => HelloEntity)
export class HelloworldResolver {

    @Query(() => HelloEntity)
    hello(): HelloEntity {
        return {
            hello: 'Hello World',
        }
    }

    // just for trying out stuff
    @ResolveField('foo', () => String)
    getFoo(@Parent() parent: HelloEntity): string {
        console.log('i was called')
        return 'Parent.hello: ' + parent.hello
    }
}