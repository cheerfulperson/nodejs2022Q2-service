import {
  BadRequestException,
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
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './models/user.modeils';
import { UsersService } from './services/users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public users(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.userService.getAllUsers(limit, offset);
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
    const invalidMessages = this.userService.checkNewUser(usersInfo);
    if (invalidMessages) {
      throw new BadRequestException(invalidMessages);
    }

    return this.userService.addOneUser(usersInfo);
  }

  @Put(':id')
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() usersInfo: UpdatePasswordDto,
  ) {
    this.userService.checkUserToUpdate(id, usersInfo);
    return this.userService.updateUser(id, usersInfo);
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
