/**
 * Define Dto to update favorite.
 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 10/04/2024
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsInt } from 'class-validator';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
    @IsInt()
    user_id?: number;

    @IsInt()
    cat_id?: number;
}
