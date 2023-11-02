import { Module } from '@nestjs/common';
import { UserController } from './entry-point/controller/user.controller';
import { UserService } from './domain/service/user.service';
import { UserRepository } from './domain/repository/user.repository';
import { ShoppingCartController } from './entry-point/controller/shopping-cart.controller';
import { ShoppingCartService } from './domain/service/shopping-cart.service';
import { ShoppingCartRepository } from './domain/repository/shopping-cart.repository';

@Module({
  imports: [],
  controllers: [UserController, ShoppingCartController],
  providers: [
    UserService,
    UserRepository,
    ShoppingCartService,
    ShoppingCartRepository,
  ],
})
export class AppModule {}
