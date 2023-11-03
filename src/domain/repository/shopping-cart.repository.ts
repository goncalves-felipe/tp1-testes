import { Injectable } from '@nestjs/common';
import { ShoppingCart } from '../entity/shopping-cart.entity';
import { Product } from '../entity/product.entity';

@Injectable()
export class ShoppingCartRepository {
  createShoppingCart(userId: number, products?: Product[]): number {
    // TODO: Connect to database and create shopping cart.
    return 1;
  }

  getActiveShoppingCartFromUser(userId: number): ShoppingCart | null {
    return null;
  }
}
