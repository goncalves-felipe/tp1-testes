import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../repository/shopping-cart.repository';
import { ShoppingCartDto } from '../../entry-point/resource/shopping-cart-dto';
import { UserService } from './user.service';
import { CreateShoppingCartDto } from '../../entry-point/resource/create-shopping-cart-dto';
import { ShoppingCart } from '../entity/shopping-cart.entity';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
    private readonly userService: UserService,
    private readonly productRepository: ProductRepository,
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

  addProductToCart(
    userId: number,
    shoppingCartId: number,
    productId: number,
    amount: number,
  ): ShoppingCartDto {
    const shoppingCart = this.shoppingCartRepository.getShoppingCartById(
      shoppingCartId,
      userId,
    );

    if (!shoppingCart) {
      throw new HttpException('Shopping cart not found', HttpStatus.NOT_FOUND);
    }

    const product = this.productRepository.getProduct(productId);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (amount <= 0) {
      throw new HttpException(
        'Amount should be greater than zero',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (amount > product.stock!) {
      throw new HttpException(
        'Not enough stock available',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingProductIndex = shoppingCart.products.findIndex(
      (item) => (item.id as number) === productId,
    );

    if (existingProductIndex !== -1) {
      const existingProduct = shoppingCart.products[existingProductIndex];
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + amount;
      }
    } else {
      const newProduct = { ...product, quantity: amount };
      shoppingCart.products.push(newProduct);
    }

    const shoppingCartDto: ShoppingCartDto = {
      id: shoppingCart.id,
      products: shoppingCart.products,
      user: shoppingCart.user,
    };

    return shoppingCartDto;
  }

  removeProductFromCart(
    userId: number,
    shoppingCartId: number,
    productId: number,
    amount: number,
  ): ShoppingCartDto {
    const shoppingCart = this.shoppingCartRepository.getShoppingCartById(
      shoppingCartId,
      userId,
    );

    if (!shoppingCart) {
      throw new HttpException('Shopping cart not found', HttpStatus.NOT_FOUND);
    }

    const product = this.productRepository.getProduct(productId);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (amount <= 0) {
      throw new HttpException(
        'Amount should be greater than zero',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingProductIndex = shoppingCart.products.findIndex(
      (item) => (item.id as number) === productId,
    );

    if (existingProductIndex === -1) {
      throw new HttpException(
        'Product not found in the shopping cart',
        HttpStatus.NOT_FOUND,
      );
    }

    const existingProduct = shoppingCart.products[existingProductIndex];

    if (amount > existingProduct.quantity!) {
      throw new HttpException(
        'Requested amount exceeds the quantity in the cart',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (amount === existingProduct.quantity) {
      shoppingCart.products.splice(existingProductIndex, 1);
    } else {
      existingProduct.quantity! -= amount;
    }

    this.shoppingCartRepository.updateShoppingCart(shoppingCart);
    return shoppingCart;
  }
}
