import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favService: FavoritesService) {}

  @Get()
  public favs() {
    return this.favService.getFavorites();
  }

  @Post('album/:id')
  @HttpCode(201)
  public addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favService.addAlbumToFav(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  public async deleteAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    await this.favService.deleteAlbumFromFav(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  public addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favService.addTrackToFav(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  public async deleteTrackFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    await this.favService.deleteTrackFromFav(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  public async addArtistToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.favService.addArtistToFav(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  public async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    await this.favService.deleteArtistFromFav(id);
  }
}
