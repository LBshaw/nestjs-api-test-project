/**
 * Define authentication services.
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserRole } from '../common/guards/roles';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  /**
   * Check if credential is avaliable.
   * 
   * @param email Email of credential
   * @param password Password of credential
   * @returns If sucuess, return user with credential, unless return null.
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = (await this.usersService.findAll()).find(user => user.email === email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  /**
   * Service for signin action.
   * 
   * @param email Email of credential
   * @param password Password of credential
   * @returns Status 200: return token, Status 401: Unauthrized.
   */
  async signIn(
    email: string,
    password: string
  ): Promise<{ token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compare(password, user.password)) {
      const payload = {
        userId: user.id,
        email: user.email,
        userName: user.userName,
        role: user.role
      };

      return {
        token: await this.jwtService.signAsync(payload)
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * Register new user.
   * 
   * @param email Email for resistration
   * @param userName Username for registration.
   * @param password Password
   * @returns Status 200: return new User, Status 401: Unauthrozed
   */
  async signUp(
    email: string,
    userName: string,
    password: string
  ): Promise<User> {
    const userDto: CreateUserDto = {
      email,
      userName,
      password: await bcrypt.hash(password, 10),
      role: UserRole.User
    };

    try {
      const response = await this.usersService.create(userDto);
      return response;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
