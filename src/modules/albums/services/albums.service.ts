import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { v4 } from 'uuid';
import { Album, AlbumDto } from '../models/album.model';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];
  private albumsToDeleteSubject = new Subject<string>();

  public deletedId = this.albumsToDeleteSubject.asObservable();

  constructor(private artistsService: ArtistsService) {
    this.artistsService.deletedId.subscribe((id) => {
      this.albums.forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
        }
      });
    });
  }

  public async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  public async addOneAlbum(albumInfo: AlbumDto) {
    const album = {
      id: v4(),
      ...albumInfo,
    };
    this.albums.push(album);
    return album;
  }

  public async getOneAlbum(id: string) {
    const album = this.albums.find((value) => value.id === id);
    return album;
  }

  public async updateOneAlbum(id: string, body: AlbumDto) {
    return new Promise((res, rej) => {
      this.albums.forEach((album) => {
        if (album.id === id) {
          album.name = body.name;
          album.artistId = body.artistId ?? null;
          album.year = body.year;
          res(album);
        }
      });
      rej();
    });
  }

  public deleteOneAlbum(id: string) {
    this.albumsToDeleteSubject.next(id);
    this.albums = this.albums.filter((value) => value.id !== id);
  }

  public checkAlbumInfo(album: AlbumDto): string[] | null {
    const messages: string[] = [];

    if (typeof album.name !== 'string') {
      messages.push('name is required field');
    }
    if (typeof album.year !== 'number') {
      messages.push('year is required field');
    }
    return messages.length === 0 ? null : messages;
  }
}
