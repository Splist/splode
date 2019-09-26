import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UtilModule } from './util';
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
    autoSchemaFile: true,
    playground: true,
    installSubscriptionHandlers: true,
});

@Module({
    imports: [
        RootTypeOrmModule,
        RootGraphQLModule,
        UtilModule,
        MessageModule,
    ],
})
export class AppModule {}
