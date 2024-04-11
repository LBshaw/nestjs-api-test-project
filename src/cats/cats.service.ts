/**
 * Define cat services.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @updated 09/04/2024
 */
import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) {}

  /**
   * Create a new cat.
   * 
   * @param catDto New cat data.
   * @returns New cat
   */
  async create(catDto: CreateCatDto): Promise<Partial<Cat> | Cat | string> {
    const cat: Partial<Cat> = {
      name: catDto.name,
      age: catDto.age,
      breed: catDto.breed
    };

    try {
      const response = await this.catsRepository.save(cat);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch all cats.
   * 
   * @returns All cats
   */
  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  /**
   * Fetch a cat.
   * 
   * @returns A cats with condition.
   */
  async findOne(@Param('id') id: number): Promise<Cat> {
    return this.catsRepository.findOneBy({ id });
  }

  /**
   * Update a cat by condition.
   * 
   * @param id cat id.
   * @param catDto
   * @returns Updated cat.
   */
  async update(@Param('id') id: number, catDto: UpdateCatDto): Promise<Cat> {
    await this.catsRepository.update(id, catDto);
    return this.catsRepository.findOneBy({ id })
  }

   /**
   * Delete a cat by condition.
   * 
   * @param id cat id.
   * @returns Deleted cat.
   */
  async remove(id: number): Promise<any> {
    const response = await this.catsRepository.delete({ id });
    return response;
  }
}
