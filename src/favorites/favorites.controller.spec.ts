/**
 * Define test scenarios of favorite controller.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @updated 10/04/2024
 */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { User } from '../users/entities/user.entity';
import { Cat } from '../cats/entities/cat.entity';


describe('FavoriteController', () => {
  let controller: FavoritesController;
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorite),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(Cat),
          useValue: {

          }
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
           
          }
        },
        
      ]
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    service = module.get<FavoritesService>(FavoritesService);
  });

  // Test create favorite
  it('should create a favorite', async () => {
    const favoriteDto: CreateFavoriteDto = {
      user_id: 1,
      cat_id: 2
    };

    jest.spyOn(service, 'create').mockImplementation(async (favoriteDto: CreateFavoriteDto) => {
      return {
        id: 1,
        user: { id: favoriteDto.user_id } as Partial<User>,
        cat: { id: favoriteDto.cat_id } as Partial<Cat>
      } as Favorite;
    });

    const result = await controller.create(favoriteDto);

    expect(service.create).toHaveBeenCalled();
    expect(result).toEqual({
      id: 1,
      user: { id: favoriteDto.user_id } as Partial<User>,
      cat: { id: favoriteDto.cat_id } as Partial<Cat>
    } as Favorite);
  });

  // Test remove favorite.
  it('should remove a favorite', async () => {
    const userId = '1';
    const catId = '1';

    jest.spyOn(service, 'remove').mockResolvedValue({} as DeleteResult);

    const result = await controller.remove(userId, catId);

    expect(service.remove).toHaveBeenCalled();

    expect(result).toEqual({} as DeleteResult);
  })
})