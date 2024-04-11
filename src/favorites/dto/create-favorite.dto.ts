/**
 * Define Dto to create favorite.
 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 10/04/2024
 */
import { IsInt } from "class-validator";

export class CreateFavoriteDto {
    @IsInt()
    readonly user_id: number;

    @IsInt()
    readonly cat_id: number
}
