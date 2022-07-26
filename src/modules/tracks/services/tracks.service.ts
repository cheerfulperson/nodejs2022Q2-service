import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from 'src/modules/favorites/services/favorites.service';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { TrackEntity } from '../entities/track.entity';
import { Track, TrackDto } from '../models/tracks.model';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository = new Repository<TrackEntity>(),
    @Inject(forwardRef(() => FavoritesService))
    private favService: FavoritesService,
  ) {}

  public async updateTrackEntity(where: Partial<Track>, isAlbum = false) {
    const tracks = await this.tracksRepository.find({
      where,
    });
    tracks.forEach((track) => {
      if (isAlbum) {
        track.albumId = null;
      } else {
        track.artistId = null;
      }
      this.tracksRepository.save(track);
    });
  }

  public async getAllTracks(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  public async addOneTrack(trackInfo: TrackDto) {
    const track = this.tracksRepository.create({
      id: v4(),
      ...trackInfo,
    });
    return this.tracksRepository.save(track);
  }

  public async getOneTrack(id: string) {
    return this.tracksRepository.findOne({ where: { id } });
  }

  public async updateTrack(id: string, body: TrackDto) {
    const track = await this.getOneTrack(id);
    if (track) {
      track.id = id;
      track.name = body.name;
      track.duration = body.duration;
      track.albumId = body.albumId ?? null;
      track.artistId = body.artistId ?? null;
      return await this.tracksRepository.save(track);
    }
  }

  public async deleteOneTrack(id: string) {
    try {
      await this.tracksRepository.delete({ id });
      await this.favService.deleteTrackFromFav(id);
    } catch (error) {}
  }

  public checkTrackInfo(track: TrackDto): string[] | null {
    const messages: string[] = [];

    if (typeof track.name !== 'string') {
      messages.push('name is required field');
    }
    if (typeof track.duration !== 'number') {
      messages.push('duration is required field');
    }
    return messages.length === 0 ? null : messages;
  }
}
