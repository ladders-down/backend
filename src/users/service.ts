import { Injectable } from '@nestjs/common';
import { User } from './models/user';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    create(user: User) {
        this.users.push(user);

        return user;
    }

    findAll(): User[] {
        return this.users;
    }

    find(id: number): User {
        return this.users.find(user => user.twitchID === id);
    }
}