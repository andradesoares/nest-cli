import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthTypeDto } from './dto/auth-type.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthTypeDto)
  public async login(@Args('data') data: AuthUserDto): Promise<AuthTypeDto> {
    const { user, token } = await this.authService.validateUser(data);

    return {
      user,
      token,
    };
  }
}
