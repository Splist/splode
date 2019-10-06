import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../entity';
import { AuthService } from './service';
import { AuthController } from './controller';
import { LocalStrategy } from './local.strat';
import { JwtStrategy } from './jwt.strat';
import { config } from '../../../data/config';

const OrmModule = TypeOrmModule.forFeature([User]);

const TokenModule = JwtModule.register({
    secret: config.jwt.secret
});

@Module({
    imports: [OrmModule, PassportModule, TokenModule],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}

export { Protected } from './guard';
