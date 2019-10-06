import { IsInt, Length, Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class MessagesInput {
    /** How many messages to skip starting from the latest */
    @Field()
    @IsInt()
    @Min(0)
    skip: number;

    /** How many messages to select after skipping */
    @Field()
    @IsInt()
    @Min(1)
    @Max(50)
    take: number;
}

@InputType()
export class MessageInput {
    /** ID of the Message to fetch */
    @Field(() => Int)
    @IsInt()
    @Min(0)
    id: number;
}

@InputType()
export class SendMessageInput {
    /** What contents to send in the new Message */
    @Field()
    @Length(1, 2000)
    content: string;
}
