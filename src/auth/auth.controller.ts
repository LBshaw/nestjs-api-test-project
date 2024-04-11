/**
 * Define authentication controller.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Signin action
   * 
   * @method POST
   * @access Public
   * @param credentials Record<string, any> 
   * @returns JWT token
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() credentials: Record<string, any>) {
    return this.authService.signIn(credentials.email, credentials.password);
  }


  /**
   * Signup action
   * 
   * @method POST
   * @access Public
   * @param userInfo Record<string, any>
   * @returns Information of new user.
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() userInfo: Record<string, any>) {
    return this.authService.signUp(
      userInfo.email,
      userInfo.firstName,
      userInfo.lastName,
      userInfo.password
    );
  }
}
