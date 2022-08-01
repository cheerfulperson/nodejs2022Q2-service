import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public artistId: string | null;

  @IsString()
  @IsOptional()
  public albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  public duration: number;
}
