import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.repo.find();

    return users;
  }

  async findUser(id: string): Promise<User> {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.repo.create(data);
    const userSaved = await this.repo.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Problem to create user');
    }

    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findUser(id);

    await this.repo.update(user, { ...data });

    const userUpdated = this.repo.create({ ...user, ...data });

    return userUpdated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUser(id);

    const deleted = await this.repo.delete(user);

    if (deleted) {
      return true;
    }

    return false;
  }
}
