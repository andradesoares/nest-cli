import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import Util from '../common/Test/util';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('returns all users', async () => {
      const user = Util.createUser();

      mockRepository.find.mockReturnValue([user, user]);

      const users = await service.findAllUsers();

      expect(users).toHaveLength(2);
    });
  });
  describe('findUser', () => {
    it('returns a single user by id', async () => {
      const userCreated = Util.createUser();

      mockRepository.findOne.mockReturnValue(userCreated);

      const userFound = await service.findUser(userCreated.id);

      expect(userFound).toMatchObject({ name: userCreated.name });
    });
    it('returns an exception when doesnt find an user by id', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findUser('3')).rejects.toBeInstanceOf(NotFoundException);
    });
  });
  describe('createUser', () => {
    it('returns a created user', async () => {
      const userCreated = Util.createUser();

      mockRepository.create.mockReturnValue(userCreated);
      mockRepository.save.mockReturnValue(userCreated);

      const userSaved = await service.createUser(userCreated);

      expect(userSaved).toMatchObject(userCreated);
    });
    it('returns an exception when doesnt create an user', async () => {
      const userCreated = Util.createUser();

      mockRepository.create.mockReturnValue(userCreated);
      mockRepository.save.mockReturnValue(null);

      await service.createUser(userCreated).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({ message: 'Problem to create user' });
      });
    });
  });
  describe('updateUser', () => {
    it('should update an user', async () => {
      const userCreated = Util.createUser();
      const updatedName = 'Udated Name';
      mockRepository.findOne.mockReturnValue(userCreated);
      mockRepository.update.mockReturnValue({
        ...userCreated,
        name: updatedName,
      });
      mockRepository.create.mockReturnValue({
        ...userCreated,
        name: updatedName,
      });
      const updatedUser = await service.updateUser(userCreated.id, {
        name: updatedName,
      });
      expect(userCreated).toMatchObject({ name: updatedUser.name });
    });
  });
  describe('deleteUser', () => {
    it('return true when deleting an user', async () => {
      const userCreated = Util.createUser();
      mockRepository.delete.mockReturnValue(userCreated);
      mockRepository.findOne.mockReturnValue(userCreated);

      const deletedUser = await service.deleteUser(userCreated.id);

      expect(deletedUser).toBe(true);
    });
    it('returns an error when triyng to delete an unexisting user', async () => {
      const userCreated = Util.createUser();
      mockRepository.delete.mockReturnValue(null);
      mockRepository.findOne.mockReturnValue(userCreated);

      const deletedUser = await service.deleteUser('3');

      expect(deletedUser).toBe(false);
    });
  });
});
