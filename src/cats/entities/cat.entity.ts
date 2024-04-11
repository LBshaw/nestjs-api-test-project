/**
 * Define entity class of cat.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { BaseEntityWithTimestamps } from "../../common/entities/base.entity.timestamps";
import { Favorite } from "../../favorites/entities/favorite.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat extends BaseEntityWithTimestamps {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @Column()
    breed: string

    @OneToMany(() => Favorite, (favorite) => favorite.cat)
    @JoinTable()
    favorites: Favorite[]
}