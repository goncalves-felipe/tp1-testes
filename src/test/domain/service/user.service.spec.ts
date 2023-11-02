import { UserRepository } from '../../../domain/repository/user.repository';
import { UserService } from '../../../domain/service/user.service';
import { UserDto } from '../../../entry-point/resource/user-dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
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

      expect(result).toThrow('There should be no empty fields.');
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

      expect(result).toThrow('There should be no empty fields.');
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

      expect(result).toThrow('There should be no empty fields.');
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

      expect(result).toThrow('There should be no empty fields.');
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
        'Password and confirmation password should be equal.',
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

        expect(result).toThrow('Invalid user type.');
      },
    );
  });
});
