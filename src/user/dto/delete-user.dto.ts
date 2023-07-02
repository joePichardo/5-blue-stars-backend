import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsEmail()
  @IsOptional
  @IsString
  email?: string;

  @IsOptional
  @IsNumber
  id?: number;
}