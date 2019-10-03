import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Input, InjectPubsub } from '../misc';
import { Message } from './entity';
import * as input from './input';

const NEW_MESSAGE = 'NEW_MESSAGE';

@Resolver(() => Message)
export class MessageResolver {
    constructor(
        @InjectRepository(Message)
        private readonly repo: Repository<Message>,
        @InjectPubsub()
        private readonly pubsub: PubSub
    ) {}

    @Query(returns => [Message])
    messages(@Input() { skip, take }: input.MessagesInput) {
        return this.repo.find({
            skip,
            take,
            order: {
                id: 'DESC'
            }
        });
    }

    @Query(returns => Message, { nullable: true })
    message(@Input() { id }: input.MessageInput) {
        return this.repo.findOne(id);
    }

    @Mutation(returns => Message)
    async sendMessage(@Input() input: input.SendMessageInput) {
        const newMessage = await this.repo.save(input);

        this.pubsub.publish(NEW_MESSAGE, { newMessage });

        return newMessage;
    }

    @Subscription(returns => Message)
    newMessage() {
        return this.pubsub.asyncIterator(NEW_MESSAGE);
    }
}
