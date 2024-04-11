/**
 * Dto to update cat entity.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { IsInt, IsString } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
