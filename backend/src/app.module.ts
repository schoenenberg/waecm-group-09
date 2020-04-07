import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RedditModule } from './modules/reddit/reddit.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RedditModule,
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }: { req: Request }) => ({ req }),
    }),
  ],
})
export class AppModule {}
