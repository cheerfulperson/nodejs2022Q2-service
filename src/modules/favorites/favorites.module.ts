import { Module } from '@nestjs/common';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './services/favorites.service';

@Module({
  imports: [ArtistsModule, AlbumsModule, TracksModule],
  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
