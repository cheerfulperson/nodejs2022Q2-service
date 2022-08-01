import { IsNumber, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  public name: string;

  @IsNumber()
  public year: number;

  @IsString()
  public artistId: string | null;
}
