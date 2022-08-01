import { IsBoolean, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  public name: string;

  @IsBoolean()
  public grammy: boolean;
}
