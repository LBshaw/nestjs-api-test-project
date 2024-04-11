/**
 * Define CURD actions of cat controller.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @updated 09/04/2024
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateCatDto } from './dto/update-cat.dto';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  
  /**
   * Create new cat.
   * 
   * @param newCat New cat information 
   * @method POST
   * @access Admin
   */
  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  async create(@Body() newCat: CreateCatDto) {
    this.catsService.create(newCat);
  }
  /**
   * Fetch all cats.
   * 
   * @method GET
   * @access Public
   * @returns List of cats.
   */
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  /**
   * Fetch a cat by id.
   * 
   * @method GET
   * @access Public
   * @param id Cat id
   * @returns cat
   */
  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  /**
   * Update a cat by id.
   * 
   * @method PATCH
   * @access Admin
   * @param id Cat id 
   * @param catDto Updates of cat.
   * @returns Updated information of cat.
   */
  @Roles(['admin'])
  @Patch(':id')
  update(@Param('id') id: number, @Body() catDto: UpdateCatDto) {
    return this.catsService.update(+id, catDto);
  }

  /**
   * Delete a cat by id.
   * 
   * @method DELETE
   * @access Admin
   * @param id Cat id.
   * @returns Removed incormation of cat.
   */
  @Roles(['admin'])
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catsService.remove(+id);
  }
}
