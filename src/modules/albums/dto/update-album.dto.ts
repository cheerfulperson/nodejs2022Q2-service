import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsNumber()
  @IsOptional()
  public year: number;

  @IsString()
  @IsOptional()
  public artistId: string | null;
}
