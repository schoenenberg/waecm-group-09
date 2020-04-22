import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Request } from 'express';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RedditModule } from './modules/reddit/reddit.module';
import { RedditConnectorModule } from './reddit-connector/reddit-connector.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RedditModule,
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: 'schema.graphql',
      context: ({ req }: { req: Request }) => ({ req }),
    }),
    MongooseModule.forRoot('mongodb://db:27017/', {
      user: 'waecm',
      pass: 'waecm20',
      db: 'test',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RedditConnectorModule,
  ],
})
export class AppModule {
}
