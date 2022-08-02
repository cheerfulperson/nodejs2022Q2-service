import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { tokenOptions } from './jwtconfig';
import { UsersModule } from '../users/users.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [JwtModule.register(tokenOptions), SharedModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
