import { Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

export class AuthTypeDto {
  @Field(() => User)
  user: User;

  token: string;
}
