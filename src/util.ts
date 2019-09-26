import { Args } from '@nestjs/graphql';
import { Inject, Module, Global } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

export const Input = () => Args('input');

export const InjectPubsub = () => Inject('PUB_SUB');

const GlobalPubSub = {
    provide: 'PUB_SUB',
    useValue: new PubSub(),
};

@Global()
@Module({
    exports: [GlobalPubSub],
    providers: [GlobalPubSub],
})
export class UtilModule {}
