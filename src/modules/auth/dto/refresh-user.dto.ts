import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsJWT()
  @IsNotEmpty()
  public refreshToken: string;
}
