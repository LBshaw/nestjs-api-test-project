/**
 * Define favorite module.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 10/04/2024
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';
import { User } from '../users/entities/user.entity';
import { Cat } from '../cats/entities/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Cat])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
