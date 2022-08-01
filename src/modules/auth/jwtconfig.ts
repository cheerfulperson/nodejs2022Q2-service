import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export const tokenOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET_KEY,
  signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
};

export const refreshTokenOptions: JwtSignOptions = {
  secret: process.env.JWT_SECRET_REFRESH_KEY,
  expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
};
