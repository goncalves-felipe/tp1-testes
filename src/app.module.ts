import { Module } from '@nestjs/common';
import { UserController } from './entry-point/controller/user.controller';
import { UserService } from './domain/service/user.service';
import { UserRepository } from './domain/repository/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
