import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message';
import { RootGraphQLModule } from './graphql';

const RootTypeOrmModule = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: __dirname + '/../data/splist.sqlite',
    entities: [__dirname + '/**/?(*.)entity.ts'],
    synchronize: true
});

@Module({
    imports: [RootTypeOrmModule, RootGraphQLModule.register(), MessageModule]
})
export class AppModule {}
