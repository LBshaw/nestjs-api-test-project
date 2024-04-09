/**
 * Define user controller.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create new user.
   * 
   * @method POST
   * @access Public
   * @param userDto New user data.
   * @returns Created user.
   */
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  /**
   * Fetch all users.
   * 
   * @method GET
   * @access Public
   * @returns All users.
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Fetch a user.
   * 
   * @method GET
   * @access Public
   * @returns A users with user id.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * Update a user.
   * 
   * @method PATCH
   * @access Public
   * @param id User id
   * @returns Updated user.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * Delete a user.
   * 
   * @method DELETE
   * @access Public
   * @param id User id
   * @returns Deleted user.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
