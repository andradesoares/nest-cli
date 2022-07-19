import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    const users = await this.userService.findAllUsers();

    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async findUser(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findUser(id);

    return user;
  }

  @Query(() => User)
  async findUserByEmail(@Args('email') email: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, data);

    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const deleted = await this.userService.deleteUser(id);

    return deleted;
  }
}
