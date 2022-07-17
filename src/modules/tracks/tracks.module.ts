import { Module } from '@nestjs/common';
import { AlbumsModule } from '../albums/albums.module';
import { TracksService } from './services/tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  imports: [AlbumsModule],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
