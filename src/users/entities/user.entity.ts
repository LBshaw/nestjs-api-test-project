/**
 * Define user entity.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { 
    Column,
    Entity, 
    JoinTable, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { BaseEntityWithTimestamps } from "../../common/entities/base.entity.timestamps";
import { UserRole } from "../../common/guards/roles";
import { Favorite } from "../../favorites/entities/favorite.entity";

@Entity()
export class User extends BaseEntityWithTimestamps {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    role: UserRole;

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    @JoinTable()
    favorites: Favorite[];
}
