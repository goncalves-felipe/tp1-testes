import { UserTypeEnum } from '../../shared/enum/user-type-enum';

export class User {
  id?: number;
  name: string;
  username: string;
  password: string;
  type: UserTypeEnum;
}
