import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  UserDto,
  mapUserDtoFromEntity,
} from '../../entry-point/resource/user-dto';
import { UserTypeEnum } from '../../shared/enum/user-type-enum';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from 'src/entry-point/resource/sign-in-user-dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  createUser(userDto: UserDto): UserDto {
    const { name, password, username, confirmationPassword, type } = userDto;

    if (!name || !password || !username || !confirmationPassword) {
      throw new HttpException(
        'There should be no empty fields.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (password !== confirmationPassword) {
      throw new HttpException(
        'Password and confirmation password should be equal.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (type !== UserTypeEnum.Customer && type !== UserTypeEnum.Employee) {
      throw new HttpException('Invalid user type.', HttpStatus.BAD_REQUEST);
    }

    const newUserId = this.userRepository.createUser(userDto);

    return mapUserDtoFromEntity({
      ...userDto,
      id: newUserId,
    });
  }

  getUserById(userId: number): UserDto {
    if (!userId) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const user = this.userRepository.getUserById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return mapUserDtoFromEntity(user);
  }

  deleteUser(userId: number): void {
    if (!userId) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    this.userRepository.deleteUser(userId);
  }

  async loginUser(
    username: string,
    password: string,
  ): Promise<SignInUserDto | null> {
    if (!password || !username) {
      throw new HttpException(
        'There should be no empty fields.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userRepository.signInUser(username, password);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: mapUserDtoFromEntity(user),
    };
  }

  updateUser(userId: number, updatedUserData: UserDto): UserDto {
    const { name, username } = updatedUserData;

    if (!userId) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const user = this.userRepository.getUserById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = {
      ...user,
      name: name || user.name,
      username: username || user.username,
    };

    this.userRepository.updateUser(userId, updatedUser);

    return mapUserDtoFromEntity(updatedUser);
  }
}
