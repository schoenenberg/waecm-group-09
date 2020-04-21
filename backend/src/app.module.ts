import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
})
export class AppModule {
}
