import { IsInt, Min, Length } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UserInput {
    /** ID of the User to fetch */
    @Field(() => Int)
    @IsInt()
    @Min(0)
    id: number;
}

@InputType()
export class CreatUserInput {
    @Field()
    @Length(1, 50)
    username: string;

    @Field()
    @Length(1, 30)
    password: string;
}
