import { Injectable } from '@nestjs/common';
import { Artist, ArtistDto } from '../models/artists.models';
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];
  private artistToDeleteSubject = new Subject<string>();

  public deletedId = this.artistToDeleteSubject.asObservable();

  public async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  public async addOneArtist(newArtist: ArtistDto) {
    const artist = {
      id: v4(),
      ...newArtist,
    };
    this.artists.push(artist);
    return artist;
  }

  public async getOneArtist(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  }

  public async updateArtist(id: string, body: ArtistDto) {
    return new Promise((res, rej) => {
      this.artists.forEach((artist) => {
        if (artist.id === id) {
          artist.name = body.name;
          artist.grammy = body.grammy;
          res(artist);
        }
      });
      rej();
    });
  }

  public deleteOneArtist(id: string) {
    this.artistToDeleteSubject.next(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }

  public checkArtistInfo(artist: ArtistDto): string[] | null {
    const messages: string[] = [];

    if (typeof artist.grammy !== 'boolean') {
      messages.push('Grammy is required field');
    }
    if (typeof artist.name !== 'string') {
      messages.push('Name is required field');
    }

    return messages.length === 0 ? null : messages;
  }
}
