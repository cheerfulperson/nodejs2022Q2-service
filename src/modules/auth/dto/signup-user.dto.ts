import { IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  public login: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
