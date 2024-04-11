/**
 * Define test scenarios of cat controller.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @updated 09/04/2024
 */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common';

import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../auth/auth.guard';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;
  let guard: RolesGuard;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn(),
      verify: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            remove: jest.fn().mockResolvedValue(Promise< Cat | string | ForbiddenException>),
            create: jest.fn().mockResolvedValue(Promise<Cat | ForbiddenException>),
            update: jest.fn().mockResolvedValue(Promise<Cat | ForbiddenException>),
            findAll: jest.fn().mockResolvedValue(Promise<Cat[]>),
            findOne: jest.fn().mockResolvedValue(Promise<Cat>)
          }
        },
        AuthGuard,
        {
          provide: RolesGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) }, // Mock the RolesGuard for testing
        },
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          }
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
    guard = module.get<RolesGuard>(RolesGuard);
  });

  /**
   * Test cat create action.
   */
  describe('create', () => {
    // Test admin action
    it('should create a new cat when user has admin role', async () => {
      const catDto: CreateCatDto = { name: 'Kitty', age: 3, breed: 'Persian' };

      jest.spyOn(service, 'create').mockResolvedValue({ id: 1, ...catDto, favorites: null, created_at: new Date(), updated_at: new Date() });

      await controller.create(catDto);
      expect(service.create).toHaveBeenCalledWith(catDto);
    });

    // Test user action
    it('should not create a new cat when user does not have admin role', async () => {
      guard.canActivate = jest.fn().mockReturnValue(false);

      const catDto: CreateCatDto = { name: 'Kitty', age: 2, breed: 'British Shorthair' };
      expect(controller.create(catDto)).toBeInstanceOf(Promise<ForbiddenException>)
    });
  });

  /**
   * Test cat fetch action.
   */
  describe('Find all cats', () => {
    it('should return an array of cats', async () => {
      const cats: Cat[] = [{ id: 1, name: 'Kitty', age: 2, breed: 'British Shorthair', favorites: null, created_at: new Date(), updated_at: new Date()  }, { id: 2, name: 'Kitty2', age: 3, breed: 'Persian', favorites: null, created_at: new Date(), updated_at: new Date() }];
     
      jest.spyOn(service, 'findAll').mockResolvedValue(cats);

      const result = await controller.findAll();
      expect(result).toEqual(cats);
    })
  });

  /**
   * Test cat update action.
   */
  describe('update', () => {
    // Test admin action.
    it('should update a cat when user has admin role', async () => {
      const catDto: UpdateCatDto = { name: 'Kitty', age: 2, breed: 'British Shorthair' };

      jest.spyOn(service, 'update').mockResolvedValue({ id: 1, ...catDto, favorites: null, created_at: new Date(), updated_at: new Date() });

      await controller.update(1, catDto);
      expect(service.update).toHaveBeenCalledWith(1, catDto);
    });

    // Test user action.
    it('should not update a cat when user does not have admin role', async () => {
      guard.canActivate = jest.fn().mockReturnValue(false);

      const catDto: UpdateCatDto = { name: 'Kitty', age: 2, breed: 'British Shorthair' };
      expect(controller.update(1, catDto)).toBeInstanceOf(Promise<ForbiddenException>)
    });
  });

  /**
   * Test cat delete action.
   */
  describe('delete', () => {
    // Test admin action.
    it('should delete a cat when user has admin role', async () => {
      const catId = 1;

      await controller.remove(catId);
      expect(service.remove).toHaveBeenCalledWith(+catId);
    });

    // Test user action.
    it('should not delete a cat when user does not have admin role', async () => {
      const catId = 1
      jest.spyOn(guard, 'canActivate').mockReturnValue(false);

      expect(controller.remove(catId)).toBeInstanceOf(Promise<ForbiddenException>)
    });
  });
})