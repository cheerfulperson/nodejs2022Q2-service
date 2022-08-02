import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from 'src/modules/users/models/user.models';
import { UsersService } from 'src/modules/users/services/users.service';
import { CryptoService } from 'src/shared/crypto.service';
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
    private cryptoService: CryptoService,
  ) {}

  public async signupUser(userInfo: SignupUserDto) {
    const passwordHash = this.cryptoService.getHash(userInfo.password);
    const userEntity = await this.userService.getUserByFields({
      login: userInfo.login,
    });
    if (userEntity) {
      throw new ConflictException('User with such login exist');
    }
    const user = await this.userService.addOneUser({
      login: userInfo.login,
      password: passwordHash,
    });
    return user;
  }

  public async authorize(userInfo: SignupUserDto) {
    const pswHash = this.cryptoService.getHash(userInfo.password);
    const user = await this.userService.getUserByFields({
      login: userInfo.login,
    });

    if (!user) {
      throw new ForbiddenException('No user with such login');
    }
    if (user.password !== pswHash) {
      throw new ForbiddenException(
        "Password or login doesn't match actual one",
      );
    }
    delete user.password;
    return this.getAuthData(user);
  }

  public async verify(token: string) {
    try {
      const jwtInfo = await this.jwtService.verifyAsync<JwtModel | undefined>(
        token,
      );

      const user = await this.userService.getOneUser(jwtInfo.id);
      return Boolean(user?.login);
    } catch (error) {
      return false;
    }
  }

  private getAuthData(user: UserResponse) {
    const payload = { id: user.id, login: user.login };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);
    return {
      id: user.id,
      login: user.login,
      accessToken,
      refreshToken,
    } as ResponseAuthData;
  }
}
