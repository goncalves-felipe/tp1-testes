import { Injectable } from '@nestjs/common';
import { ShoppingCart } from '../entity/shopping-cart.entity';
import { Product } from '../entity/product.entity';

@Injectable()
export class ShoppingCartRepository {
  updateShoppingCart(shoppingCart: ShoppingCart) {
    // TODO
    return new ShoppingCart();
  }
  getShoppingCartById(shoppingCartId: number, userId: number){
    // TODO    
    return new ShoppingCart();
  }
  createShoppingCart(userId: number, products?: Product[]): number {
    // TODO: Connect to database and create shopping cart.
    return 1;
  }

  getActiveShoppingCartFromUser(userId: number): ShoppingCart | null {
    return null;
  }
}
