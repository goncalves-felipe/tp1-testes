import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../repository/shopping-cart.repository';
import { ShoppingCartDto } from '../../entry-point/resource/shopping-cart-dto';
import { UserService } from './user.service';
import { CreateShoppingCartDto } from '../../entry-point/resource/create-shopping-cart-dto';
import { ShoppingCart } from '../entity/shopping-cart.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
    private readonly userService: UserService,
  ) {}

  createShoppingCart(
    userId: number,
    createShoppingCartDto: CreateShoppingCartDto,
  ): ShoppingCartDto {
    const { products } = createShoppingCartDto;

    if (!userId) {
      throw new HttpException('Invalid user Id', HttpStatus.BAD_REQUEST);
    }

    const activeShoppingCartFromUser =
      this.getActiveShoppingCartFromUser(userId);

    if (activeShoppingCartFromUser) {
      throw new HttpException(
        'The user already have an active shopping cart.',
        HttpStatus.FORBIDDEN,
      );
    }

    const newShoppingCartId = this.shoppingCartRepository.createShoppingCart(
      userId,
      products,
    );

    const user = this.userService.getUserById(userId);

    return {
      products: products || [],
      user: user,
      id: newShoppingCartId,
    };
  }

  private getActiveShoppingCartFromUser(userId: number): ShoppingCart | null {
    return this.shoppingCartRepository.getActiveShoppingCartFromUser(userId);
  }
}
