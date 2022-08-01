import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public artistId: string | null;

  @IsString()
  public albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  public duration: number;
}
