import { Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Repository } from 'typeorm';
import { InjectPubsub, Input, CurrentUser } from '../graphql';
import { Message } from './entity';
import * as input from './input';
import { Protected } from '../user/auth';
import { User } from '../user/entity';

const NEW_MESSAGE = 'NEW_MESSAGE';

@Resolver(() => Message)
@Protected()
export class MessageResolver {
    constructor(
        @InjectRepository(Message)
        private readonly repo: Repository<Message>,
        @InjectPubsub()
        private readonly pubsub: PubSub
    ) {}

    @Query(() => [Message])
    messages(@Input() { skip, take }: input.MessagesInput) {
        return this.repo.find({
            skip,
            take,
            order: {
                id: 'DESC'
            }
        });
    }

    @Query(() => Message, { nullable: true })
    message(@Input() { id }: input.MessageInput) {
        return this.repo.findOne(id);
    }

    @Mutation(() => Message)
    async sendMessage(@Input() input: input.SendMessageInput, @CurrentUser() author: User) {
        const newMessage = await this.repo.save(
            this.repo.create({
                ...input,
                author
            })
        );

        this.pubsub.publish(NEW_MESSAGE, { newMessage });

        return newMessage;
    }

    @Subscription(() => Message)
    newMessage() {
        return this.pubsub.asyncIterator(NEW_MESSAGE);
    }
}
