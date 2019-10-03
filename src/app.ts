import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../data/config';
import { MessageModule } from './message';
import { MiscModule } from './misc';

// [TODO] Add better config for everything in this file

const RootTypeOrmModule = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: __dirname + '/../data/splist.sqlite',
    entities: [__dirname + '/**/?(*.)entity.ts'],
    synchronize: true
});

const RootGraphQLModule = GraphQLModule.forRoot({
    // autoSchemaFile must be true or string for it to work
    autoSchemaFile: config.graphql.generateSchema ? 'schema.graphql' : true,
    playground: Boolean(config.graphql.enablePlayground),

    path: '/',
    installSubscriptionHandlers: true,
    subscriptions: '/'
});

@Module({
    imports: [RootTypeOrmModule, RootGraphQLModule, MiscModule, MessageModule]
})
export class AppModule {}
