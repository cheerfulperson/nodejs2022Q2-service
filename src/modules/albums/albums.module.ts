import { forwardRef, Module } from '@nestjs/common';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [forwardRef(() => ArtistsModule), forwardRef(() => TracksModule)],
  providers: [AlbumsService],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
