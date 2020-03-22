import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UserResolver],
  imports: [AuthModule],
})
export class UserModule {}
