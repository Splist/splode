import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        private readonly jwt: JwtService
    ) {
        this.esnureRootUser();
    }

    fetchUser(username: string, authData?: boolean) {
        return this.repo.findOne({
            where: {
                username
            },
            // Js magic, only include the select property when authData === true
            ...(authData
                ? {
                      select: ['password']
                  }
                : {})
        });
    }

    async validateUser(username: string, password: string) {
        const user = await this.fetchUser(username);

        if (!user) return null;

        const authData = await this.fetchUser(username, true);

        if (!authData) return null;

        if (authData.password !== password) return null;

        return user;
    }

    async login(user: User) {
        return {
            accesToken: this.jwt.sign({
                sub: user.id
            })
        };
    }

    async esnureRootUser() {
        const rootUser = await this.repo.findOne(0);

        if (rootUser) return;

        await this.repo.save({
            id: 0,
            username: 'root',
            password: 'root'
        });
    }
}
