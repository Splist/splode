import { IsInt, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UserInput {
    /** ID of the User to fetch */
    @Field(() => Int)
    @IsInt()
    @Min(0)
    id: number;
}
