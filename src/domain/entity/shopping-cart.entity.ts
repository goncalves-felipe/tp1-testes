import { Product } from './product.entity';
import { User } from './user.entity';

export class ShoppingCart {
  id?: number;
  user: User;
  products: Product[];
  active: boolean;
}
