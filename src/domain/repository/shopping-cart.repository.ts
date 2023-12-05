import { Injectable } from '@nestjs/common';
import { ShoppingCart } from '../entity/shopping-cart.entity';
import { Product } from '../entity/product.entity';

const shoppingCart: ShoppingCart = {
  user: {
    id: 1,
    username: 'felipe-goncalves',
    name: 'Felipe Gonçalves',
    type: 0,
    password: '',
  },
  active: true,
  id: 1,
  products: [
    {
      id: 1,
      name: 'product',
      description: 'product description',
      price: 20,
      stock: 10,
      quantity: 5,
    },
  ],
};

@Injectable()
export class ShoppingCartRepository {
  updateShoppingCart(shoppingCart: ShoppingCart) {
    return shoppingCart;
  }
  getShoppingCartById(shoppingCartId: number, userId: number) {
    return shoppingCart;
  }
  createShoppingCart(userId: number, products?: Product[]): number {
    return 1;
  }

  getActiveShoppingCartFromUser(userId: number): ShoppingCart | null {
    return shoppingCart;
  }
}
