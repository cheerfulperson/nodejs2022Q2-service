import { Body, Controller, HttpCode, Post, SetMetadata } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { AuthService } from './service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @SetMetadata('allowUnauthorizedRequest', true)
  @HttpCode(201)
  public async signup(@Body() authInfo: SignupUserDto) {
    return this.authService.signupUser(authInfo);
  }

  @Post('login')
  @SetMetadata('allowUnauthorizedRequest', true)
  public async login(@Body() authInfo: SignupUserDto) {
    return this.authService.authorize(authInfo);
  }

  @Post('refresh')
  public refresh() {}
}
