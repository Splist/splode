import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { User } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentUser, Input } from '../graphql';
import { Protected } from './auth';
import * as input from './input';

@Resolver(() => User)
@Protected()
export class UserResolver {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>
    ) {}

    @Query(() => User)
    self(@CurrentUser() user: User) {
        return user;
    }

    @Query(() => [User])
    users() {
        return this.repo.find();
    }

    @Query(() => User, { nullable: true })
    user(@Input() { id }: input.UserInput) {
        return this.repo.findOne(id);
    }

    @Mutation(() => User)
    createUser(@Input() input: input.CreatUserInput) {
        return this.repo.save(input);
    }
}
