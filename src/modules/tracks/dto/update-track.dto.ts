import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public artistId: string | null;

  @IsString()
  @IsOptional()
  public albumId: string | null;

  @IsNumber()
  @IsOptional()
  public duration: number;
}
