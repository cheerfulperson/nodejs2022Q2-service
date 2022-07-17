import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Track, TrackDto, TracksResponse } from '../models/tracks.model';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  public async getAllTracks(
    limit?: number,
    offset = 0,
  ): Promise<TracksResponse> {
    return {
      items: limit
        ? this.tracks.slice(limit * offset, limit * (offset + 1))
        : this.tracks,
      limit: limit ?? null,
      total: this.tracks.length,
      offset,
    };
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
