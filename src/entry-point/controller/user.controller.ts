import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from '../resource/user-dto';
import { UserService } from 'src/domain/service/user.service';
import { SignInUserDto } from '../resource/sign-in-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserBody: UserDto): UserDto {
    const newUser = this.userService.createUser(createUserBody);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: number) {
    this.userService.deleteUser(userId);
  }

  @Post('login')
  async loginUser(@Body() loginData: UserDto): Promise<SignInUserDto | null> {
    return await this.userService.loginUser(
      loginData.username,
      loginData.password,
    );
  }

  @Patch(':id')
  updateUser(@Param('id') userId: number, @Body() updatedUserData: UserDto) {
    return this.userService.updateUser(userId, updatedUserData);
  }

  @Get(':id')
  getUser(@Param('id') userId: number) {
    return this.userService.getUserById(userId);
  }
}
