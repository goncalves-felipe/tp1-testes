import { User } from '../../domain/entity/user.entity';
import { UserTypeEnum } from 'src/shared/enum/user-type-enum';

export class UserDto {
  public id?: number;
  public name: string;
  public username: string;
  public password: string;
  public confirmationPassword?: string;
  public type: UserTypeEnum;
}

export const mapUserDtoFromEntity = (entity: User) => {
  const userDto: UserDto = new UserDto();

  userDto.id = entity.id;
  userDto.name = entity.name;
  userDto.type = entity.type;
  userDto.username = entity.username;

  return userDto;
};
