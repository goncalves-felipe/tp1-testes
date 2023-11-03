import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/entry-point/resource/user-dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  createUser(userDto: UserDto): number {
    // TODO: Connect to database and return user id.
    return 1;
  }

  getUserById(userId: number): User | null {
    return {
      id: userId,
      name: 'Felipe Gonçalves',
      password: '',
      username: 'felipe',
      type: 0,
    };
  }

  signInUser(username: string, password: string): User | null {
    return {
      id: 1,
      name: 'Felipe Gonçalves',
      password,
      username,
      type: 0,
    };
  }

  deleteUser(userId: number) {
    // TODO
  }

  updateUser(userId: number, updatedUser: User): void {
    // TODO
  }
}
