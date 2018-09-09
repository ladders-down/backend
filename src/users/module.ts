import { Module } from '@nestjs/common';
import { UsersResolvers } from './resolvers';
import { UsersService } from './service';

@Module({
  providers: [UsersService, UsersResolvers],
})
export class UsersModule {}