import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoritesService } from 'src/modules/favorites/services/favorites.service';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { v4 } from 'uuid';
import { Album, AlbumDto } from '../models/album.model';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favService: FavoritesService,
  ) {}

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

  public async deleteOneAlbum(id: string) {
    this.albums = this.albums.filter((value) => value.id !== id);
    try {
      await this.tracksService.updateTrackEntity({ albumId: id }, true);
      await this.favService.deleteAlbumFromFav(id);
    } catch (error) {}
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
