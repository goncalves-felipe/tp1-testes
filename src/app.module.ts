import { Module } from '@nestjs/common';
import { UserController } from './entry-point/controller/user.controller';
import { UserService } from './domain/service/user.service';
import { UserRepository } from './domain/repository/user.repository';
import { ShoppingCartController } from './entry-point/controller/shopping-cart.controller';
import { ShoppingCartService } from './domain/service/shopping-cart.service';
import { ShoppingCartRepository } from './domain/repository/shopping-cart.repository';
import { ProductController } from './entry-point/controller/product.controller';
import { ProductService } from './domain/service/product.service';
import { ProductRepository } from './domain/repository/product.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UserController, ShoppingCartController, ProductController],
  providers: [
    UserService,
    UserRepository,
    ShoppingCartService,
    ShoppingCartRepository,
    ProductService,
    ProductRepository,
    JwtService,
  ],
})
export class AppModule {}
