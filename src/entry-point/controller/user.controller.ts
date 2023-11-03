import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UserDto } from '../resource/user-dto';
import { UserService } from 'src/domain/service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserBody: UserDto): UserDto {
    try {
      const newUser = this.userService.createUser(createUserBody);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: number): string {
    try {
      const deletedUserId = this.userService.deleteUser(userId);
      if (deletedUserId) {
        return 'User ID ${deletedUserId} deleted.';
      } else {
        return 'User ID ${userId} not found.';
      }
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  loginUser(@Body() loginData: UserDto): string {
    try {
      const user = this.userService.loginUser(loginData);
      if (user) {
        return `Welcome, ${user.name}!`;
      } else {
        return 'Invalid username or password.';
      }
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  editUser(@Param('id') userId: number, @Body() updatedUserData: UserDto): string {
    try {
      const updatedUser = this.userService.editUser(userId, updatedUserData);
      if (updatedUser) {
        return `User ID ${userId} updated successfully.`;
      } else {
        return `User ID ${userId} not found.`;
      }
    } catch (error) {
      throw error;
    }
  }
  
}

//nao sei oq é isto, mas foi sugestao do vscode pra linha 20
function Param(arg0: string): (target: UserController, propertyKey: "deleteUser" | "editUser", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

function Patch(arg0: string): (target: UserController, propertyKey: "editUser", descriptor: TypedPropertyDescriptor<(userId: number, updatedUserData: UserDto) => string>) => void{
  throw new Error('Function not implemented.');
}
