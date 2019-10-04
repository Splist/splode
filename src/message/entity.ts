import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * A message that was sent.
 */
@ObjectType()
@Entity()
export class Message {
    /** The ID of the message */
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    /** The content of the message */
    @Field()
    @Column()
    content: string;
}
