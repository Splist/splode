import { Args } from '@nestjs/graphql';
import { Inject, Module, Global, createParamDecorator } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from '../data/config';

const GlobalPubSub = {
    provide: 'PUB_SUB',
    useValue: new PubSub()
};

const ConfigedModule = GraphQLModule.forRoot({
    // autoSchemaFile must be true or string for it to work
    autoSchemaFile: config.graphql.generateSchema ? 'schema.graphql' : true,
    playground: Boolean(config.graphql.enablePlayground),

    context({ req, connection }) {
        const token = connection ? connection.context.Authorization : req.headers.authorization;

        return {
            req: {
                headers: {
                    authorization: token
                }
            }
        };
    },

    installSubscriptionHandlers: true,
    subscriptions: '/'
});

@Global()
@Module({
    imports: [ConfigedModule],
    exports: [GlobalPubSub],
    providers: [GlobalPubSub]
})
export class RootGraphQLModule {}

export const Input = () => Args('input');

export const InjectPubsub = () => Inject('PUB_SUB');

export const CurrentUser = createParamDecorator((data, [, , ctx]) => ctx.req.user);
