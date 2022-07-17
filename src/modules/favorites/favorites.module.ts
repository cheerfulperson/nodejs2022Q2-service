import { Module } from '@nestjs/common';
import { AlbumsService } from '../albums/services/albums.service';
import { ArtistsService } from '../artists/services/artists.service';
import { TracksService } from '../tracks/services/tracks.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './services/favorites.service';

@Module({
  providers: [FavoritesService, AlbumsService, ArtistsService, TracksService],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
