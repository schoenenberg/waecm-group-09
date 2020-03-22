import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { HelloModel } from './models/hello.model';

@Resolver(() => HelloModel)
export class HelloworldResolver {
  @Query(() => HelloModel)
  hello(): HelloModel {
    return {
      hello: 'Hello World',
    };
  }

  // just for trying out stuff
  @ResolveField('foo', () => String)
  getFoo(@Parent() parent: HelloModel): string {
    console.log('i was called');
    return 'Parent.hello: ' + parent.hello;
  }
}
