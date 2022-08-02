import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsService } from './services/artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  public artists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  public async artist(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.artistsService.getOneArtist(id);
    await this.checkArtistExistence(id);

    return user;
  }

  @Post()
  @HttpCode(201)
  public async createArtist(@Body() artistsInfo: CreateArtistDto) {
    return this.artistsService.addOneArtist(artistsInfo);
  }

  @Put(':id')
  public async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() artistsInfo: UpdateArtistDto,
  ) {
    try {
      const artist = await this.artistsService.updateArtist(id, artistsInfo);
      return artist;
    } catch (error) {
      throw new NotFoundException('Artist is not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.checkArtistExistence(id);
    this.artistsService.deleteOneArtist(id);
  }

  private async checkArtistExistence(id: string) {
    const artist = await this.artistsService.getOneArtist(id);

    if (!artist) {
      throw new NotFoundException('Artist is not found');
    }
  }
}
