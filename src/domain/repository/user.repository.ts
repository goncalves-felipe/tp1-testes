import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/entry-point/resource/user-dto';

@Injectable()
export class UserRepository {
  createUser(userDto: UserDto): number {
    // TODO: Connect to database and return user id.
    return 1;
  }
}
