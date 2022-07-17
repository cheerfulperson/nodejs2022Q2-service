import { Module } from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
