/**
 * Define authentication module.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './password.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '1h' }
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    {
      provide: APP_GUARD,
      useClass: JwtStrategy
    }
  ],
  exports: [AuthService]
})
export class AuthModule {}
