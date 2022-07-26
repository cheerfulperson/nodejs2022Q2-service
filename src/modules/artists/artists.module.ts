import { Module } from '@nestjs/common';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './services/artists.service';

@Module({
  imports: [TracksModule],
  providers: [ArtistsService],
  controllers: [ArtistsController],
  exports: [ArtistsService],
})
export class ArtistsModule {}
