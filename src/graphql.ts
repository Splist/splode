import { Args } from '@nestjs/graphql';
import { Inject, Module, Global, DynamicModule } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from '../data/config';

const GlobalPubSub = {
    provide: 'PUB_SUB',
    useValue: new PubSub()
};

@Global()
@Module({})
export class RootGraphQLModule {

    static register(): DynamicModule {

        const ConfigedModule = GraphQLModule.forRoot({
            // autoSchemaFile must be true or string for it to work
            autoSchemaFile: config.graphql.generateSchema ? 'schema.graphql' : true,
            playground: Boolean(config.graphql.enablePlayground),

            installSubscriptionHandlers: true,
            subscriptions: '/'
        });

        return {
            module: RootGraphQLModule,
            imports: [ConfigedModule],
            exports: [GlobalPubSub],
            providers: [GlobalPubSub],
        };
    }
}

export const Input = () => Args('input');

export const InjectPubsub = () => Inject('PUB_SUB');
