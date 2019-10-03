import { IsInt, Length, Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class MessagesInput {
    @Field()
    @IsInt()
    @Min(0)
    skip: number;

    @Field()
    @IsInt()
    @Min(1)
    @Max(50)
    take: number;
}

@InputType()
export class MessageInput {
    @Field(() => Int)
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
