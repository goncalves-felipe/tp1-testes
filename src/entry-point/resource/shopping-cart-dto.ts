import { UserDto } from './user-dto';

export class ShoppingCartDto {
  public id?: number;
  public products: any[];
  public user: UserDto;
}
