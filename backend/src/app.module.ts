import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {HelloworldModule} from "./modules/helloworld/helloworld.module"

@Module({
    imports: [
        HelloworldModule,
        GraphQLModule.forRoot({
            debug: false,
            playground: true,
            autoSchemaFile: 'schema.gql',
        }),
    ],
})
export class AppModule {
}


