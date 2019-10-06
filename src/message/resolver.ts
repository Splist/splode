import { Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Repository } from 'typeorm';
import { InjectPubsub, Input } from '../graphql';
import { Message } from './entity';
import * as input from './input';
import { Protected } from '../user/auth';

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
    async sendMessage(@Input() input: input.SendMessageInput) {
        const newMessage = await this.repo.save(input);

        this.pubsub.publish(NEW_MESSAGE, { newMessage });

        return newMessage;
    }

    @Subscription(() => Message)
    newMessage() {
        return this.pubsub.asyncIterator(NEW_MESSAGE);
    }
}
