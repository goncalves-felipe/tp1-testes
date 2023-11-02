import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../repository/shopping-cart.repository';
import { ShoppingCartDto } from '../../entry-point/resource/shopping-cart-dto';
import { UserService } from './user.service';
import { mapUserDtoFromEntity } from '../../entry-point/resource/user-dto';
import { CreateShoppingCartDto } from '../../entry-point/resource/create-shopping-cart-dto';

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
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const activeShoppingCartFromUser =
      this.getActiveShoppingCartFromUser(userId);

    if (activeShoppingCartFromUser) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'The user already have an active shopping cart.',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const newShoppingCartId = this.shoppingCartRepository.createShoppingCart(
      userId,
      products,
    );

    const user = this.userService.getUserById(userId);
    const userDto = mapUserDtoFromEntity(user);

    return {
      products: products || [],
      user: userDto,
      id: newShoppingCartId,
    };
  }

  private getActiveShoppingCartFromUser(userId: number): any | null {
    return this.shoppingCartRepository.getActiveShoppingCartFromUser(userId);
  }
}
