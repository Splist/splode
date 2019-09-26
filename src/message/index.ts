import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entity';
import { MessageResolver } from './resolver';

const OrmModule = TypeOrmModule.forFeature([Message]);

@Module({
    imports: [OrmModule],
    providers: [
        MessageResolver,
    ],
})
export class MessageModule {}
