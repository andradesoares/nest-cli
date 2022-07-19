import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Field must be not empty' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Field must be not empty' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'Field must be not empty' })
  @IsOptional()
  password?: string;
}
