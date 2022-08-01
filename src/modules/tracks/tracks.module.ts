import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TrackEntity } from './entities/track.entity';
import { TracksService } from './services/tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  imports: [
    ArtistsModule,
    AlbumsModule,
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
