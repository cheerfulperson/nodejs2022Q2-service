import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from 'src/modules/users/models/user.models';
import { UsersService } from 'src/modules/users/services/users.service';
import { SignupUserDto } from '../dto/signup-user.dto';
import { refreshTokenOptions } from '../jwtconfig';
import { ResponseAuthData } from '../models/auth.model';
import { JwtModel } from '../models/jwt.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signupUser(userInfo: SignupUserDto) {
    const user = await this.userService.addOneUser(userInfo);
    return this.getAuthData(user);
  }

  public authorize(userInfo: SignupUserDto) {}

  public async verify(token: string) {
    const jwtInfo = this.jwtService.verify<JwtModel | undefined>(token);
    if (!jwtInfo) return false;

    const user = await this.userService.getOneUser(jwtInfo.id);
    return Boolean(user?.login);
  }

  private getAuthData(user: UserResponse) {
    const payload = { id: user.id, login: user.login };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);
    return {
      id: user.id,
      login: user.login,
      token,
      refreshToken,
    } as ResponseAuthData;
  }
}
