import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './service';
import { ParseIntPipe } from '@nestjs/common';
import { User } from './models/user';
import * as request from 'request-promise';
import { app } from 'app';

@Resolver('User')
export class UsersResolvers {
    constructor(private readonly usersService: UsersService) {}

    @Query()
    async getUsers() {
        return await this.usersService.findAll();
    }

    @Query('find')
    async find(
        @Args('id', ParseIntPipe)
        id: number,
    ) {
        return await this.usersService.find(id);
    }

    @Mutation('createUser')
    async create(@Args('code') code: string) {
        try {
            const tokenRes = await request('https://id.twitch.tv/oauth2/token', {
                method: 'POST',
                body: {
                    client_id: app.twitch.clientID,
                    client_secret: app.twitch.secret,
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: 'http://localhost:3000',
                },
                json: true,
            });

            const user: User = {
                twitchID: 1,
                accessToken: tokenRes.access_token,
                canList: true,
            };

            const createdUser = await this.usersService.create(user);

            return createdUser;
        } catch (error) {
            console.log('Error getting AccessToken', error.message);
        }
    }
}
