import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../../entry-point/resource/user-dto';
import { UserTypeEnum } from '../../shared/enum/user-type-enum';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(userDto: UserDto): UserDto {
    const { name, password, username, confirmationPassword, type } = userDto;

    if (!name || !password || !username || !confirmationPassword) {
      throw 'There should be no empty fields.';
    }

    if (password !== confirmationPassword) {
      throw 'Password and confirmation password should be equal.';
    }

    if (type !== UserTypeEnum.Customer && type !== UserTypeEnum.Employee) {
      throw 'Invalid user type.';
    }

    const newUserId = this.userRepository.createUser(userDto);

    return {
      ...userDto,
      password: '',
      confirmationPassword: '',
      id: newUserId,
    };
  }

  getUserById(userId: number): User {
    if (!userId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userRepository.getUserById(userId);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  deleteUser(userId: number): string {
    if (!userId) {
      throw 'Invalid user ID';
    }

    const deletedUserId = this.userRepository.deleteUser(userId);

    if (!deletedUserId) {
      throw 'User not found';
    }

    return `User with ID ${deletedUserId} has been deleted successfully.`;
  }  

  loginUser(loginData: UserDto): User | null {
    const { username, password } = loginData;

    if (username === 'felipe' && password === 'password') {
      return {
        id: 1,
        name: 'Felipe Gonçalves',
        username: 'felipe',
        password: '',
        type: 0,
      };
    } else {
      throw 'Invalid username or password';
    }
  }

  editUser(userId: number, updatedUserData: UserDto): User | null {
    const user = this.userRepository.getUserById(userId);

    if (!user) {
      throw 'User not found';
    }

    user.name = updatedUserData.name || user.name;
    user.username = updatedUserData.username || user.username;

    this.userRepository.updateUser(userId, user);

    return user;
  }


}
