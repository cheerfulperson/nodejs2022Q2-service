import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { AlbumsService } from 'src/modules/albums/services/albums.service';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { TrackEntity } from '../entities/track.entity';
import { Track } from '../models/tracks.model';
import { CreateTrackDto } from '.././dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TracksService {
  private toDeleteSubject = new Subject<string>();

  public deletedId = this.toDeleteSubject.asObservable();

  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository = new Repository<TrackEntity>(),
    private albumServie: AlbumsService,
    private artistService: ArtistsService,
  ) {
    this.albumServie.deletedId.subscribe((id) => {
      this.updateTrackEntity({ albumId: id }, true);
    });
    this.artistService.deletedId.subscribe((id) => {
      this.updateTrackEntity({ artistId: id });
    });
  }

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

  public async addOneTrack(trackInfo: CreateTrackDto) {
    const track = this.tracksRepository.create({
      id: v4(),
      ...trackInfo,
    });
    return this.tracksRepository.save(track);
  }

  public async getOneTrack(id: string) {
    return this.tracksRepository.findOne({ where: { id } });
  }

  public async updateTrack(id: string, body: UpdateTrackDto) {
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
    this.toDeleteSubject.next(id);
    await this.tracksRepository.delete({ id });
  }
}
