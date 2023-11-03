import { UserTypeEnum } from 'src/shared/enum/user-type-enum';
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

  describe('getUserById', () => {
    it('Should return a user with a valid ID', () => {
      const existingUserId = 1;

      const existingUser: UserDto = {
        id: existingUserId,
        name: 'John Doe',
        username: 'johndoe',
        password: 'password',
        confirmationPassword: 'password',
        type: 0,
      };

      userRepository.getUserById = (userId) => {
        if (userId === existingUserId) {
          return existingUser;
        }
        return null;
      };

      const result = userService.getUserById(existingUserId);

      expect(result).toEqual(existingUser);
    });

    it('Should throw an error with an invalid ID', () => {
      const existingUserId = 1;

      userRepository.getUserById = () => null;

      const invalidUserId = 999;

      expect(() => userService.getUserById(invalidUserId)).toThrow();
    });
  });

  describe('editUser', () => {
    beforeEach(() => {
      jest.spyOn(userRepository, 'updateUser').mockImplementation(() => 1);
    });

    it('Should update user data with valid ID and fields', () => {
      const existingUserId = 1;

      const existingUser: UserDto = {
        id: existingUserId,
        name: 'John Doe',
        username: 'johndoe',
        password: 'password',
        confirmationPassword: 'password',
        type: 0,
      };

      userRepository.getUserById = (userId) => {
        if (userId === existingUserId) {
          return existingUser;
        }
        return null;
      };

      const editedData: UserDto = {
        name: 'Updated Name',
        username: 'updatedusername',
        password: '',
        confirmationPassword: '',
        type: UserTypeEnum.Customer
      };

      const result = userService.editUser(existingUserId, editedData);

      expect(result).toEqual({
        ...existingUser,
        name: 'Updated Name',
        username: 'updatedusername',
      });
    });

    it('Should throw an error with an invalid ID', () => {
      const existingUserId = 1;

      userRepository.getUserById = () => null;

      const editedData: UserDto = {
        name: 'Updated Name',
        username: 'updatedusername',
        password: '',
        confirmationPassword: '',
        type: UserTypeEnum.Customer
      };

      const invalidUserId = 999;

      expect(() => userService.editUser(invalidUserId, editedData)).toThrow();
    });
  });

  describe('deleteUser', () => {
    it('Should delete a user with a valid ID', () => {
      const existingUserId = 1;

      userRepository.deleteUser = (userId) => {
        if (userId === existingUserId) {
          return existingUserId;
        }
        return null; 
      };

      const result = userService.deleteUser(existingUserId);

      expect(result).toEqual(existingUserId);
    });

    it('Should throw an error with an invalid ID', () => {
      userRepository.deleteUser = () => null;

      const invalidUserId = 999;

      expect(() => userService.deleteUser(invalidUserId)).toThrow();
    });
  });

  describe('createUser', () => {
    it('Should create a customer user', () => {
      const userDto: UserDto = {
        name: 'John Doe',
        confirmationPassword: 'abc123',
        password: 'abc123',
        type: 0,
        username: 'johndoe',
      };

      const result = userService.createUser(userDto);

      expect(result.type).toEqual(0);
    });

    it('Should create an employee user', () => {
      const userDto: UserDto = {
        name: 'Alice Smith',
        confirmationPassword: 'xyz789',
        password: 'xyz789',
        type: 1,
        username: 'alicesmith',
      };

      const result = userService.createUser(userDto);

      expect(result.type).toEqual(1);
    });

    it('Should throw an error with an invalid user type', () => {
      const userDto: UserDto = {
        name: 'Invalid User',
        confirmationPassword: 'invalid123',
        password: 'invalid123',
        type: 2, 
        username: 'invaliduser',
      };

      expect(() => userService.createUser(userDto)).toThrow('Invalid user type.');
    });

    it('Should create a user successfully', () => {
      const userDto: UserDto = {
        name: 'John Doe',
        confirmationPassword: 'abc123',
        password: 'abc123',
        type: 0, // Customer
        username: 'johndoe',
      };

      const result = userService.createUser(userDto);

      expect(result.id).toBeDefined();
    });

    it('Should create a user with the correct name', () => {
      const userDto: UserDto = {
        name: 'Alice Smith',
        confirmationPassword: 'xyz789',
        password: 'xyz789',
        type: 1,
        username: 'alicesmith',
      };

      const result = userService.createUser(userDto);

      expect(result.name).toEqual('Alice Smith');
    });

    it('Should create a user with the correct type', () => {
      const userDto: UserDto = {
        name: 'Bob Johnson',
        confirmationPassword: '123456',
        password: '123456',
        type: 0, 
        username: 'bobjohnson',
      };

      const result = userService.createUser(userDto);

      expect(result.type).toEqual(0);
    });

  });
});
