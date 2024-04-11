/**
 * Define application module.
 *
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @updated 10/04/2024
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

// Config
import { config } from './config/configuration';

// Modules
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { FavoritesModule } from './favorites/favorites.module';

// Providers
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.typeOrm as TypeOrmModuleOptions),
    CoreModule, 
    CatsModule, 
    UsersModule, 
    AuthModule, 
    FavoritesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})

export class AppModule {};
