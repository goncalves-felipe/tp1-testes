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
}
