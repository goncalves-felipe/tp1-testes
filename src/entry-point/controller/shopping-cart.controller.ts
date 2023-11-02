import { Body, Controller, Param, Post } from '@nestjs/common';
import { ShoppingCartDto } from '../resource/shopping-cart-dto';
import { ShoppingCartService } from '../../domain/service/shopping-cart.service';
import { CreateShoppingCartDto } from '../resource/create-shopping-cart-dto';

@Controller('user/:userId/shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  createShoppingCart(
    @Param() params: { userId: string },
    @Body() body: CreateShoppingCartDto,
  ): ShoppingCartDto {
    try {
      const newShoppingCart = this.shoppingCartService.createShoppingCart(
        +params.userId,
        body,
      );
      return newShoppingCart;
    } catch (error) {
      throw error;
    }
  }
}
