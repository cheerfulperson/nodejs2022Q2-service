import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from 'src/modules/albums/models/album.model';
import { AlbumsService } from 'src/modules/albums/services/albums.service';
import { Artist } from 'src/modules/artists/models/artists.models';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { Track } from 'src/modules/tracks/models/tracks.model';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { Favorites } from '../models/favorites.model';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  constructor(
    private artistsService: ArtistsService,
    private tracksService: TracksService,
    private albumsService: AlbumsService,
  ) {}

  public async getFavorites() {
    return {
      albums: (await this.getEntityByIds(this.favorites.albums, (id) =>
        this.albumsService.getOneAlbum(id),
      )) as Album[],
      tracks: (await this.getEntityByIds(this.favorites.tracks, (id) =>
        this.tracksService.getOneTrack(id),
      )) as Track[],
      artists: (await this.getEntityByIds(this.favorites.artists, (id) =>
        this.artistsService.getOneArtist(id),
      )) as Artist[],
    };
  }

  public async addAlbumToFav(id: string) {
    const album = await this.albumsService.getOneAlbum(id);
    if (!album) {
      throw new HttpException(
        'Unprocessable Entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favorites.albums.push(id);
    return album;
  }

  public async deleteAlbumFromFav(id: string) {
    const albumId = this.favorites.albums.find((cId) => cId === id);

    if (!albumId) {
      throw new NotFoundException(`Album is not favorite`);
    }
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  public async addTrackToFav(id: string) {
    const track = await this.tracksService.getOneTrack(id);
    if (!track) {
      throw new HttpException(
        'Unprocessable Entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favorites.tracks.push(id);
    return track;
  }

  public async deleteTrackFromFav(id: string) {
    const trackId = this.favorites.tracks.find((cId) => cId === id);

    if (!trackId) {
      throw new NotFoundException(`Track is not favorite`);
    }
    this.favorites.tracks = this.favorites.tracks.filter((eId) => eId !== id);
  }

  public async addArtistToFav(id: string) {
    const artist = await this.artistsService.getOneArtist(id);
    if (!artist) {
      throw new HttpException(
        'Unprocessable Entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favorites.artists.push(id);
    return artist;
  }

  public async deleteArtistFromFav(id: string) {
    const artistId = this.favorites.artists.find((cId) => cId === id);

    if (!artistId) {
      throw new NotFoundException(`Artist is not favorite`);
    }
    this.favorites.artists = this.favorites.artists.filter((eId) => eId !== id);
  }

  private async getEntityByIds(
    ids: string[],
    cb: (id: string) => Promise<unknown>,
  ) {
    return (await Promise.allSettled(ids.map((id) => cb(id))))
      .filter((value) => value && value.status === 'fulfilled')
      .map((entity) => {
        if (entity.status === 'fulfilled') {
          return entity.value;
        }
      });
  }
}
