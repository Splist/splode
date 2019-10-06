import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity';
import { UserResolver } from './resolver';

const OrmModule = TypeOrmModule.forFeature([User]);

@Module({
    imports: [OrmModule, AuthModule],
    providers: [UserResolver]
})
export class UserModule {}
