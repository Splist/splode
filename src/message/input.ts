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
    /** ID of the message */
    @Field(() => Int)
    @IsInt()
    @Min(0)
    id: number;
}

@InputType()
export class SendMessageInput {
    /** The content of the message */
    @Field()
    @Length(1, 2000)
    content: string;
}
