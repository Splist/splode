import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message';
import { RootGraphQLModule } from './graphql';
import { UserModule } from './user';

const RootTypeOrmModule = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: __dirname + '/../data/splist.sqlite',
    entities: [__dirname + '/**/?(*.)entity.ts'],
    synchronize: true
});

@Module({
    imports: [RootTypeOrmModule, RootGraphQLModule, UserModule, MessageModule]
})
export class AppModule {}
