import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User, UserResponse } from '../models/user.models';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  public async addOneUser(newUser: CreateUserDto) {
    const createdUser = this.userRepository.create({
      ...newUser,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  public async getOneUser(id: string) {
    if (validate(id)) {
      const user = await this.userRepository.findOne({ where: { id } });
      if (user) {
        return user.toResponse();
      }
    }
  }

  public async updateUser(id: string, body: UpdatePasswordDto) {
    const message = 'forbidden';
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (user.password !== body.oldPassword) {
        throw new Error(message);
      }
      user.id = id;
      user.password = body.newPassword;
      user.updatedAt = Date.now();
      user.version += 1;
      return (await this.userRepository.save(user)).toResponse();
    } catch (error) {
      if (error.message === message) {
        throw new ForbiddenException('Old passwor was invalid');
      }
      throw new InternalServerErrorException();
    }
  }

  public async deleteOneUser(id: string) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('User was not found');
    }
    return result;
  }

  public async getUserByFields(userEntity: Partial<User>) {
    const user = await this.userRepository.findOne({ where: userEntity });
    return user?.getUserInfo() ?? null;
  }
}
