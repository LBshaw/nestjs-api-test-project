/**
 * Define Dto to create user entity.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @update 09/04/2024
 */
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../common/guards/roles';


export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly userName: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsBoolean()
    readonly role: UserRole    
}