import { UserDto } from './user-dto';

export class SignInUserDto {
  user: UserDto;
  accessToken: string;
}
