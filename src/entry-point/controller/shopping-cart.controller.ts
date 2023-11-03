import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { ShoppingCartDto } from '../resource/shopping-cart-dto';
import { ShoppingCartService } from '../../domain/service/shopping-cart.service';
import { CreateShoppingCartDto } from '../resource/create-shopping-cart-dto';

@Controller('users/:userId/shopping-carts')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  createShoppingCart(
    @Param() params: { userId: string },
    @Body() body: CreateShoppingCartDto,
  ): ShoppingCartDto {
    const newShoppingCart = this.shoppingCartService.createShoppingCart(
      +params.userId,
      body,
    );
    return newShoppingCart;
  }

  @Post(':shoppingCartId/products/:productId')
  addProductToCart(
    @Param() params: { userId: string; shoppingCartId: string; productId: string },
    @Body('amount') amount: number,
  ): ShoppingCartDto {
    const newShoppingCart = this.shoppingCartService.addProductToCart(
      +params.userId,
      +params.shoppingCartId,
      +params.productId,
      amount,
    );
    return newShoppingCart;
  }

  @Delete(':shoppingCartId/products/:productId')
  removeProductFromCart(
    @Param() params: { userId: string; shoppingCartId: string; productId: string },
    @Query('amount') amount: number,
  ): ShoppingCartDto {
    const newShoppingCart = this.shoppingCartService.removeProductFromCart(
      +params.userId,
      +params.shoppingCartId,
      +params.productId,
      amount,
    );
    return newShoppingCart;
  }
}
