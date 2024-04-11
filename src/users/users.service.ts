/**
 * Define user services.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../common/guards/roles';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}


  async create(userDto: CreateUserDto): Promise<Partial<User> & User> {
    const user: Partial<User> = {
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      password: userDto.password,
      role: UserRole.User
    };
  
    try {
      const existedUser = (await this.findAll()).find(u => u.email === user.email);
      if(existedUser) {
        throw new ConflictException();
      }

      const res = await this.usersRepository.save(user);
      Logger.log("Signed up successfully!");
      return res;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({where: {email}});
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({where: {id}});
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
