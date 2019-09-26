import { InputType, Field, Int } from 'type-graphql';
import { IsInt, Min, Length, Max } from 'class-validator';

@InputType()
export class MessagesInput {

    @Field()
    @IsInt()
    @Min(0)
    skip: number;

    @Field()
    @IsInt()
    @Min(0)
    @Max(50)
    take: number;
}

@InputType()
export class MessageInput {

    @Field(type => Int)
    @IsInt()
    @Min(0)
    id: string;
}

@InputType()
export class SendMessageInput {

    @Field()
    @Length(1, 2000)
    content: string;
}
