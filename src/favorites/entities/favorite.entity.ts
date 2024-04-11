/**
 * Define favorite entity.
 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 10/04/2024
 */
import { Cat } from "../../cats/entities/cat.entity";
import { User } from "../../users/entities/user.entity";
import { BaseEntityWithTimestamps } from "../../common/entities/base.entity.timestamps";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite extends BaseEntityWithTimestamps {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.favorites)
    user: User;

    @ManyToOne(() => Cat, cat => cat.favorites)
    cat: Cat;
}
