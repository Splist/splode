import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { MiscModule } from './misc';
import { MessageModule } from './message';

// [TODO] Add better config for everything in this file

const RootTypeOrmModule = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: __dirname + '/../data/splist.sqlite',
    entities: [__dirname + '/**/?(*.)entity.ts'],
    synchronize: true,
});

const RootGraphQLModule = GraphQLModule.forRoot({

    // autoSchemaFile must be true or string for it to work
    autoSchemaFile: 'schema.graphql',
    playground: true,

    installSubscriptionHandlers: true,
    subscriptions: '/',
});

@Module({
    imports: [
        RootTypeOrmModule,
        RootGraphQLModule,
        MiscModule,
        MessageModule,
    ],
})
export class AppModule {}
