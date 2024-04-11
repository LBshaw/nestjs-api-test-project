/**
 * Define cat module.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @updated 09/04/2024
 */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity';
import { CatsService } from './cats.service';

import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    JwtService,
    CatsService
  ],
  exports: [CatsService]
})
export class CatsModule {}
