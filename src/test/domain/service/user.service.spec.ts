import { UserRepository } from '../../../domain/repository/user.repository';
import { UserService } from '../../../domain/service/user.service';
import { UserDto } from '../../../entry-point/resource/user-dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../domain/entity/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(() => {
    userRepository = new UserRepository();
    jwtService = new JwtService();
    userService = new UserService(userRepository, jwtService);
  });

  describe('createUser', () => {
    beforeEach(() => {
      jest.spyOn(userRepository, 'createUser').mockImplementation(() => 1);
    });

    it('Should throw error when name is empty', () => {
      const userDto: UserDto = {
        name: '',
        confirmationPassword: 'abc123',
        password: 'abc123',
        type: 0,
        username: 'username',
      };

      const result = () => userService.createUser(userDto);

      expect(result).toThrow(
        new HttpException(
          'There should be no empty fields.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('Should throw error when username is empty', () => {
      const userDto: UserDto = {
        name: 'name',
        confirmationPassword: 'abc123',
        password: 'abc123',
        type: 0,
        username: '',
      };

      const result = () => userService.createUser(userDto);

      expect(result).toThrow(
        new HttpException(
          'There should be no empty fields.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('Should throw error when password is empty', () => {
      const userDto: UserDto = {
        name: 'name',
        confirmationPassword: 'abc123',
        password: '',
        type: 0,
        username: 'username',
      };

      const result = () => userService.createUser(userDto);

      expect(result).toThrow(
        new HttpException(
          'There should be no empty fields.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('Should throw error when confirmationPassword is empty', () => {
      const userDto: UserDto = {
        name: 'name',
        confirmationPassword: '',
        password: 'abc123',
        type: 0,
        username: 'username',
      };

      const result = () => userService.createUser(userDto);

      expect(result).toThrow(
        new HttpException(
          'There should be no empty fields.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('Should throw error when password and confirmationPassword are different', () => {
      const userDto: UserDto = {
        name: 'name',
        confirmationPassword: '123abc',
        password: 'abc123',
        type: 0,
        username: 'username',
      };

      const result = () => userService.createUser(userDto);

      expect(result).toThrow(
        new HttpException(
          'Password and confirmation password should be equal.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    test.each([2, 3, -1, -2])(
      'Should throw error when user type is invalid',
      (arg) => {
        const userDto: UserDto = {
          name: 'name',
          confirmationPassword: 'abc123',
          password: 'abc123',
          type: arg,
          username: 'username',
        };

        const result = () => userService.createUser(userDto);

        expect(result).toThrow(
          new HttpException('Invalid user type.', HttpStatus.BAD_REQUEST),
        );
      },
    );

    it('Should create user correctly', () => {
      const userDto: UserDto = {
        name: 'name',
        confirmationPassword: 'abc123',
        password: 'abc123',
        type: 0,
        username: 'username',
      };

      const expectedUser = {
        id: 1,
        name: 'name',
        type: 0,
        username: 'username',
      };

      const result = userService.createUser(userDto);

      expect(result).toEqual(expectedUser);
    });
  });

  describe('getUserById', () => {
    it('Should return a user with a valid Id', () => {
      const userId = 1;

      const user: User = {
        id: userId,
        name: 'John Doe',
        username: 'johndoe',
        password: 'password',
        type: 0,
      };

      const mappedUser = {
        id: userId,
        name: 'John Doe',
        type: 0,
        username: 'johndoe',
      };

      jest.spyOn(userRepository, 'getUserById').mockImplementation(() => user);

      const result = userService.getUserById(userId);

      expect(result).toEqual(mappedUser);
    });

    it('Should throw an error with an invalid id', () => {
      const userId = 1;

      const user: User = {
        id: userId,
        name: 'John Doe',
        username: 'johndoe',
        password: 'password',
        type: 0,
      };

      jest.spyOn(userRepository, 'getUserById').mockImplementation(() => user);

      const invalidUserId = 0;

      expect(() => userService.getUserById(invalidUserId)).toThrow(
        new HttpException('Invalid user id', HttpStatus.BAD_REQUEST),
      );
    });

    it('Should throw an error when user is not found', () => {
      jest.spyOn(userRepository, 'getUserById').mockImplementation(() => null);

      const userId = 1;

      expect(() => userService.getUserById(userId)).toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('deleteUser', () => {
    it('should throw error when userId is invalid', () => {
      const userId = 0;

      const result = () => userService.deleteUser(userId);

      expect(result).toThrow(
        new HttpException('Invalid user id', HttpStatus.BAD_REQUEST),
      );
    });

    it('should not throw error with userId is valid', () => {
      const userId = 1;

      const result = () => userService.deleteUser(userId);

      expect(result).not.toThrow();
    });
  });

  describe('loginUser', () => {
    beforeEach(() => {
      jest
        .spyOn(JwtService.prototype, 'signAsync')
        .mockImplementation(async () => await Promise.resolve('abcefg'));
    });

    it('should throw error when username is empty', async () => {
      const username = '';
      const password = 'password';

      const result = async () =>
        await userService.loginUser(username, password);

      await expect(result).rejects.toThrow(
        new HttpException(
          'There should be no empty fields.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw error when password is empty', async () => {
      const username = 'username';
      const password = '';

      const result = async () =>
        await userService.loginUser(username, password);

      await expect(result).rejects.toThrow(
        new HttpException(
          'There should be no empty fields.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw error when user is not found', async () => {
      const username = 'username';
      const password = 'password';

      jest.spyOn(userRepository, 'signInUser').mockImplementation(() => null);

      const result = async () =>
        await userService.loginUser(username, password);

      await expect(result).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should return token and user', async () => {
      const username = 'username';
      const password = 'password';

      const user: User = { id: 1, name: 'name', username, password, type: 0 };
      const mappedUser = { id: 1, name: 'name', username, type: 0 };

      jest.spyOn(userRepository, 'signInUser').mockImplementation(() => user);

      const result = await userService.loginUser(username, password);

      expect(result?.user).toEqual(mappedUser);
      expect(result?.accessToken).toEqual('abcefg');
    });
  });

  describe('updateUser', () => {
    it('should throw error when userId is invalid', () => {
      const userId = 0;
      const userData = {
        name: 'new name',
        username: 'new username',
      } as UserDto;

      const result = () => userService.updateUser(userId, userData);

      expect(result).toThrow(
        new HttpException('Invalid user id', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw error when userId is not found', () => {
      const userId = 1;
      const userData = {
        name: 'new name',
        username: 'new username',
      } as UserDto;

      jest.spyOn(userRepository, 'getUserById').mockImplementation(() => null);

      const result = () => userService.updateUser(userId, userData);

      expect(result).toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should return mapped user', () => {
      const userId = 1;
      const userData = {
        name: 'new name',
        username: 'new username',
      } as UserDto;
      const user = {
        id: 1,
        name: 'name',
        username: 'username',
        type: 0,
      } as User;
      const expectedUser = {
        id: 1,
        name: 'new name',
        username: 'new username',
        type: 0,
      };

      jest.spyOn(userRepository, 'getUserById').mockImplementation(() => user);
      jest.spyOn(userRepository, 'updateUser');

      const result = userService.updateUser(userId, userData);

      expect(result).toEqual(expectedUser);
      expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
    });

    it('should keep old name the new is empty', () => {
      const userId = 1;
      const userData = {
        name: '',
        username: 'new username',
      } as UserDto;
      const user = {
        id: 1,
        name: 'name',
        username: 'username',
        type: 0,
      } as User;
      const expectedUser = {
        id: 1,
        name: 'name',
        username: 'new username',
        type: 0,
      };

      jest.spyOn(userRepository, 'getUserById').mockImplementation(() => user);
      jest.spyOn(userRepository, 'updateUser');

      const result = userService.updateUser(userId, userData);

      expect(result).toEqual(expectedUser);
      expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
    });

    it('should keep old username the new is empty', () => {
      const userId = 1;
      const userData = {
        name: 'new name',
        username: 'username',
      } as UserDto;
      const user = {
        id: 1,
        name: 'name',
        username: 'username',
        type: 0,
      } as User;
      const expectedUser = {
        id: 1,
        name: 'new name',
        username: 'username',
        type: 0,
      };

      jest.spyOn(userRepository, 'getUserById').mockImplementation(() => user);
      jest.spyOn(userRepository, 'updateUser');

      const result = userService.updateUser(userId, userData);

      expect(result).toEqual(expectedUser);
      expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
    });
  });
});
