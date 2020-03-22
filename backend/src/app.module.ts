import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Request } from 'express';
import { HelloworldModule } from './modules/helloworld/helloworld.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    HelloworldModule,
    AuthModule,
    UserModule,
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }: { req: Request }) => ({ req }),
    }),
  ],
})
export class AppModule {}
