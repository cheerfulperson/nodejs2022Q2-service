import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  public oldPassword: string;

  @IsString()
  @IsNotEmpty()
  public newPassword: string;
}
