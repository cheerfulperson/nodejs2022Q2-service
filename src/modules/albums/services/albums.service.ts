import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Album, AlbumDto, AlbumsResponse } from '../models/album.model';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  public async getAllAlbums(
    limit?: number,
    offset = 0,
  ): Promise<AlbumsResponse> {
    return {
      items: limit
        ? this.albums.slice(limit * offset, limit * (offset + 1))
        : this.albums,
      limit: limit ?? null,
      total: this.albums.length,
      offset,
    };
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
