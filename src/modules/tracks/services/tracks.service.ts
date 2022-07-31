import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { AlbumsService } from 'src/modules/albums/services/albums.service';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { v4 } from 'uuid';
import { Track, TrackDto } from '../models/tracks.model';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];
  private tracksToDeleteSubject = new Subject<string>();

  public deletedId = this.tracksToDeleteSubject.asObservable();

  constructor(
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
  ) {
    this.artistsService.deletedId.subscribe((id) => {
      this.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });
    });
    this.albumsService.deletedId.subscribe((id) => {
      this.tracks.forEach((track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
      });
    });
  }

  public async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  public async addOneTrack(trackInfo: TrackDto) {
    const track = {
      id: v4(),
      ...trackInfo,
    };
    this.tracks.push(track);
    return track;
  }

  public async getOneTrack(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    return track;
  }

  public async updateTrack(id: string, body: TrackDto) {
    return new Promise((res, rej) => {
      this.tracks.forEach((track) => {
        if (track.id === id) {
          track.name = body.name;
          track.duration = body.duration;
          track.albumId = body.albumId ?? null;
          track.artistId = body.artistId ?? null;
          res(track);
        }
      });
      rej();
    });
  }

  public deleteOneTrack(id: string) {
    this.tracksToDeleteSubject.next(id);
    this.tracks = this.tracks.filter((track) => track.id !== id);
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
