import { UserService } from '../../../domain/service/user.service';
import { ShoppingCartRepository } from '../../../domain/repository/shopping-cart.repository';
import { ShoppingCartService } from '../../../domain/service/shopping-cart.service';
import { UserRepository } from '../../../domain/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ProductDto } from '../../../entry-point/resource/product-dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ShoppingCart } from '../../../domain/entity/shopping-cart.entity';
import { User } from 'src/domain/entity/user.entity';
import { UserDto } from 'src/entry-point/resource/user-dto';
import { ProductRepository } from '../../../domain/repository/product.repository';

describe('ShoppingCartService', () => {
  let shoppingCartService: ShoppingCartService;
  let shoppingCartRepository: ShoppingCartRepository;
  let userService: UserService;
  let userRepository: UserRepository;
  let jwtService: JwtService;
  let productRepository: ProductRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    jwtService = new JwtService();
    userService = new UserService(userRepository, jwtService);
    shoppingCartRepository = new ShoppingCartRepository();
    productRepository = new ProductRepository();
    shoppingCartService = new ShoppingCartService(
      shoppingCartRepository,
      userService,
      productRepository,
    );
  });

  describe('createShoppingCart', () => {
    it('should throw error when userId is invalid', () => {
      const userId = 0;
      const products: ProductDto[] = [];

      const result = () =>
        shoppingCartService.createShoppingCart(userId, { products });

      expect(result).toThrow(
        new HttpException('Invalid user Id', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw error when user already have an active shopping cart', () => {
      const userId = 1;
      const products: ProductDto[] = [];

      const user = {
        id: userId,
        name: 'name',
        username: 'username',
        type: 0,
      } as User;
      const userShoppingCart: ShoppingCart = {
        id: 1,
        active: true,
        products: [],
        user,
      };

      jest
        .spyOn(shoppingCartRepository, 'getActiveShoppingCartFromUser')
        .mockImplementation(() => userShoppingCart);

      const result = () =>
        shoppingCartService.createShoppingCart(userId, { products });

      expect(result).toThrow(
        new HttpException(
          'The user already have an active shopping cart.',
          HttpStatus.FORBIDDEN,
        ),
      );
    });

    it('it should create a new shopping cart without products', () => {
      const userId = 1;
      const products: ProductDto[] = [];

      const user = {
        id: userId,
        name: 'name',
        username: 'username',
        type: 0,
      } as UserDto;

      jest
        .spyOn(shoppingCartRepository, 'getActiveShoppingCartFromUser')
        .mockImplementation(() => null);
      jest
        .spyOn(shoppingCartRepository, 'createShoppingCart')
        .mockImplementation(() => 1);
      jest.spyOn(userService, 'getUserById').mockImplementation(() => user);

      const result = shoppingCartService.createShoppingCart(userId, {
        products,
      });

      expect(result).toEqual({ products: [], user, id: 1 });
    });

    it('it should create a new shopping cart with products', () => {
      const userId = 1;
      const products: ProductDto[] = [
        { id: 1, name: 'product', description: 'description', price: 1 },
        { id: 2, name: 'product 2', description: 'description 2', price: 2 },
      ];

      const user = {
        id: userId,
        name: 'name',
        username: 'username',
        type: 0,
      } as UserDto;

      jest
        .spyOn(shoppingCartRepository, 'getActiveShoppingCartFromUser')
        .mockImplementation(() => null);
      jest
        .spyOn(shoppingCartRepository, 'createShoppingCart')
        .mockImplementation(() => 1);
      jest.spyOn(userService, 'getUserById').mockImplementation(() => user);

      const result = shoppingCartService.createShoppingCart(userId, {
        products,
      });

      expect(result).toEqual({ products, user, id: 1 });
    });
  });

  describe('addProductToCart', () => {
    it('should throw an error when adding a product with insufficient stock', () => {
      const shoppingCart = {
        id: 1,
        user: {
          id: 1,
          name: 'User Name',
          username: 'user123',
          type: 0,
          password: 'password123',
        },
        products: [],
        active: true,
      };

      jest
        .spyOn(shoppingCartRepository, 'getShoppingCartById')
        .mockReturnValue(shoppingCart);

      jest.spyOn(productRepository, 'getProduct').mockReturnValue({
        id: 1,
        name: 'Product 1',
        description: 'Description',
        price: 10,
        stock: 5,
      });

      expect(() => shoppingCartService.addProductToCart(1, 1, 1, 10)).toThrow();
    });
  });
});
