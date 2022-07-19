import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Field must be not empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Field must be not empty' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Field must be not empty' })
  email: string;
}
