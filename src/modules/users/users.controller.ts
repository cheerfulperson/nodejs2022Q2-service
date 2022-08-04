import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UsersService } from './services/users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public users() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  public async user(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getOneUser(id);

    await this.checkUserExistence(id);
    return user;
  }

  @Post()
  @HttpCode(201)
  public async createUser(@Body() usersInfo: CreateUserDto) {
    return this.userService.addOneUser(usersInfo);
  }

  @Put(':id')
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() usersInfo: UpdatePasswordDto,
  ) {
    await this.checkUserExistence(id);
    return await this.userService.updateUser(id, usersInfo);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.checkUserExistence(id);
    this.userService.deleteOneUser(id);
  }

  private async checkUserExistence(id: string) {
    const user = await this.userService.getOneUser(id);

    if (!user) {
      throw new NotFoundException();
    }
  }
}
