import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './models/user.modeils';
import { UsersService } from './services/users.service';
import { validate } from 'uuid';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public getArtists(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.userService.getAllUsers(limit, offset);
  }

  @Get(':id')
  public async getArtist(@Param('id') id: string) {
    const user = await this.userService.getOneUser(id);

    if (!validate(id)) {
      throw new BadRequestException('Bad ID');
    }
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  public async createArtist(@Body() usersInfo: CreateUserDto) {
    const invalidMessages = this.userService.checkNewUser(usersInfo);
    if (invalidMessages) {
      throw new BadRequestException(invalidMessages);
    }

    return this.userService.addOneUser(usersInfo);
  }
}
