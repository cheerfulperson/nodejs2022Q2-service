import { Module } from '@nestjs/common';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [ArtistsModule],
  providers: [AlbumsService],
  controllers: [AlbumsController],
  exports: [AlbumsService, ArtistsModule],
})
export class AlbumsModule {}
