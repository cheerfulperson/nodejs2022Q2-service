import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { AuthService } from './service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  public async signup(@Body() authInfo: SignupUserDto) {
    return this.authService.signupUser(authInfo);
  }

  @Post('login')
  public async login() {}

  @Post('refresh')
  public refresh() {}
}
