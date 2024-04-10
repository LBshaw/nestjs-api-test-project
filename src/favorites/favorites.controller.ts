/**
 * Define favorite controller.
 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 10/04/2024
 */
import { Controller, Post, Body, Delete, Query } from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  /**
   * Create a new favorite.
   * 
   * @method POST
   * @access Public
   * @param favorite new favorite.
   * @returns a new favorite.
   */
  @Post()
  create(@Body() favorite: CreateFavoriteDto) {
    return this.favoritesService.create(favorite);
  }

  /**
   * Delete a favorite.
   * 
   * @method DELETE
   * @access Public
   * @query user_id, cate_id.
   * @returns deleted favorite.
   */
  @Delete()
  remove(
    @Query('user_id') userId: string,
    @Query('cat_id') catId: string
  ) {
    return this.favoritesService.remove(userId, catId);
  }
}