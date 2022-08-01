import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  public name: string;

  @IsString()
  public artistId: string | null;

  @IsString()
  public albumId: string | null;

  @IsNumber()
  public duration: number;
}
