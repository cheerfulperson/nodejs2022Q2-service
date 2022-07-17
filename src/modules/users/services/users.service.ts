import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
  UsersResponse,
} from '../models/user.modeils';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public async getAllUsers(limit?: number, offset = 0): Promise<UsersResponse> {
    const users = this.users.map<Omit<User, 'password'>>((user) => {
      delete user.password;
      return user;
    });
    return {
      items: limit ? users.slice(limit * offset, limit * (offset + 1)) : users,
      limit: limit ?? null,
      total: this.users.length,
      offset,
    };
  }

  public async addOneUser(newUser: CreateUserDto) {
    const user = {
      id: v4(),
      ...newUser,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push({
      ...user,
    });
    delete user.password;
    return user;
  }

  public async getOneUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      delete user.password;
    }
    return user;
  }

  public async updateUser(id: string, body: UpdatePasswordDto) {
    return new Promise((res, rej) => {
      this.users.forEach((user) => {
        if (user.id === id) {
          user.password = body.newPassword;
          user.updatedAt = Date.now();
          user.version += 1;
          res({
            id: user.id,
            login: user.login,
            version: user.version,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          });
        }
      });
      rej();
    });
  }

  public deleteOneUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  public checkNewUser(newUser: CreateUserDto): string[] | null {
    const messages: string[] = [];

    if (!newUser.login || typeof newUser.login !== 'string') {
      messages.push('Login is required field');
    }
    if (!newUser.password || typeof newUser.password !== 'string') {
      messages.push('Password is required field');
    }

    return messages.length === 0 ? null : messages;
  }

  public checkUserToUpdate(id: string, body: UpdatePasswordDto): void {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== body.oldPassword) {
      throw new ForbiddenException();
    }
  }
}
