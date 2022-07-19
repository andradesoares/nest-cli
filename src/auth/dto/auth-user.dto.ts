import { InputType } from '@nestjs/graphql';

@InputType()
export class AuthUserDto {
  email: string;

  password: string;
}
