import { ProductDto } from './product-dto';
import { UserDto } from './user-dto';

export class ShoppingCartDto {
  public id?: number;
  public products: ProductDto[];
  public user: UserDto;
}
