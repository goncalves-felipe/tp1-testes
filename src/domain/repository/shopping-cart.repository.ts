import { Injectable } from '@nestjs/common';

@Injectable()
export class ShoppingCartRepository {
  createShoppingCart(userId: number, products?: any[]): number {
    // TODO: Connect to database and create shopping cart.
    return 1;
  }

  getActiveShoppingCartFromUser(userId: number): any | null {
    return null;
  }
}
