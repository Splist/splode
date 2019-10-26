import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/entity';

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

    @Field()
    @ManyToOne(() => User, user => user.messages, { lazy: true, nullable: false })
    author: User;
}
