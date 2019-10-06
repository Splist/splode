import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly auth: AuthService) {
        super();
    }

    async validate(username: string, password: string) {
        const user = await this.auth.validateUser(username, password);

        if (!user) throw new UnauthorizedException();

        return user;
    }
}
