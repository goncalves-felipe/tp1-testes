import { UserTypeEnum } from 'src/shared/enum/user-type-enum';

export class UserDto {
  public id?: number;
  public name: string;
  public username: string;
  public password: string;
  public confirmationPassword: string;
  public type: UserTypeEnum;
}
