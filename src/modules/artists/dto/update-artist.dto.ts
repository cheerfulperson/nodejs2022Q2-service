import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsBoolean()
  @IsOptional()
  public grammy: boolean;
}
