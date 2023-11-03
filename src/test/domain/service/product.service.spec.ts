import { ProductRepository } from '../../../domain/repository/product.repository';
import { ProductService } from '../../../domain/service/product.service';
import { ProductDto } from '../../../entry-point/resource/product-dto';

describe('ProductService', () => {
  let userService: ProductService;
  let userRepository: ProductRepository;

  beforeEach(() => {
    userRepository = new ProductRepository();
    userService = new ProductService(ProductRepository);
  });

//   describe('createUser', () => {
//     beforeEach(() => {
//       jest.spyOn(userRepository, 'createUser').mockImplementation(() => 1);
//     });

//     it('Should throw error when name is empty', () => {
//       const userDto: UserDto = {
//         name: '',
//         confirmationPassword: 'abc123',
//         password: 'abc123',
//         type: 0,
//         username: 'username',
//       };

//       const result = () => userService.createUser(userDto);

//       expect(result).toThrow('There should be no empty fields.');
//     });

//     it('Should throw error when username is empty', () => {
//       const userDto: UserDto = {
//         name: 'name',
//         confirmationPassword: 'abc123',
//         password: 'abc123',
//         type: 0,
//         username: '',
//       };

//       const result = () => userService.createUser(userDto);

//       expect(result).toThrow('There should be no empty fields.');
//     });

//     it('Should throw error when password is empty', () => {
//       const userDto: UserDto = {
//         name: 'name',
//         confirmationPassword: 'abc123',
//         password: '',
//         type: 0,
//         username: 'username',
//       };

//       const result = () => userService.createUser(userDto);

//       expect(result).toThrow('There should be no empty fields.');
//     });

//     it('Should throw error when confirmationPassword is empty', () => {
//       const userDto: UserDto = {
//         name: 'name',
//         confirmationPassword: '',
//         password: 'abc123',
//         type: 0,
//         username: 'username',
//       };

//       const result = () => userService.createUser(userDto);

//       expect(result).toThrow('There should be no empty fields.');
//     });

//     it('Should throw error when password and confirmationPassword are different', () => {
//       const userDto: UserDto = {
//         name: 'name',
//         confirmationPassword: '123abc',
//         password: 'abc123',
//         type: 0,
//         username: 'username',
//       };

//       const result = () => userService.createUser(userDto);

//       expect(result).toThrow(
//         'Password and confirmation password should be equal.',
//       );
//     });

//     it('Should return a user with a valid ID', () => {
//       const existingUserId = 1;

//       const existingUser: UserDto = {
//         id: existingUserId,
//         name: 'John Doe',
//         username: 'johndoe',
//         password: 'password',
//         confirmationPassword: 'password',
//         type: 0,
//       };

//       userRepository.getUserById = (userId) => {
//         if (userId === existingUserId) {
//           return existingUser;
//         }
//         return null;
//       };

//       const result = userService.getUserById(existingUserId);

//       expect(result).toEqual(existingUser);
//     });

//     it('Should throw an error with an invalid ID', () => {
//       const existingUserId = 1;

//       userRepository.getUserById = () => null;

//       const invalidUserId = 999;

//       expect(() => userService.getUserById(invalidUserId)).toThrow();
//     });

//     test.each([2, 3, -1, -2])(
//       'Should throw error when user type is invalid',
//       (arg) => {
//         const userDto: UserDto = {
//           name: 'name',
//           confirmationPassword: 'abc123',
//           password: 'abc123',
//           type: arg,
//           username: 'username',
//         };

//         const result = () => userService.createUser(userDto);

//         expect(result).toThrow('Invalid user type.');
//       },
//     );
//   });
});
