import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * A Message sent in a TextChannel
 */
@ObjectType()
@Entity()
export class Message {
    /** The Message's ID */
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    /** The contents of the Message */
    @Field()
    @Column()
    content: string;
}
