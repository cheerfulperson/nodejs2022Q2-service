import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/modules/albums/models/album.model';
import { AlbumsService } from 'src/modules/albums/services/albums.service';
import { Artist } from 'src/modules/artists/models/artists.models';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { Track } from 'src/modules/tracks/models/tracks.model';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { Repository } from 'typeorm';
import { FavoriteEntity } from '../entities/favorites.entity';

@Injectable()
export class FavoritesService {
  private userId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

  constructor(
    @InjectRepository(FavoriteEntity)
    private favoritesRepository = new Repository<FavoriteEntity>(),
    private artistsService: ArtistsService,
    private tracksService: TracksService,
    private albumsService: AlbumsService,
  ) {
    this.onInit();
  }

  private async onInit() {
    const favorites = await this.getFavoritesIds();
    this.artistsService.deletedId.subscribe((id) => {
      if (favorites.artists.find((eId) => eId === id)) {
        this.deleteArtistFromFav(id);
      }
    });
    this.tracksService.deletedId.subscribe((id) => {
      if (favorites.tracks.find((eId) => eId === id)) {
        this.deleteTrackFromFav(id);
      }
    });
    this.albumsService.deletedId.subscribe((id) => {
      if (favorites.albums.find((eId) => eId === id)) {
        this.deleteAlbumFromFav(id);
      }
    });
  }

  public async getFavorites() {
    const favorites = await this.getFavoritesIds();
    return {
      albums: (await this.getEntityByIds(favorites.albums, (id) =>
        this.albumsService.getOneAlbum(id),
      )) as Album[],
      tracks: (await this.getEntityByIds(favorites.tracks, (id) =>
        this.tracksService.getOneTrack(id),
      )) as Track[],
      artists: (await this.getEntityByIds(favorites.artists, (id) =>
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
    const favorites = await this.getFavoritesIds();
    favorites.pushAlbum(id);
    await this.favoritesRepository.save(favorites);
    return album;
  }

  public async deleteAlbumFromFav(id: string) {
    const albumId = (await this.getFavoritesIds()).albums.find(
      (aid) => aid === id,
    );

    if (!albumId) {
      throw new NotFoundException(`Album is not favorite`);
    }

    const favorites = await this.getFavoritesIds();
    favorites.removeAlbum(id);
    await this.favoritesRepository.save(favorites);
  }

  public async addTrackToFav(id: string) {
    const track = await this.tracksService.getOneTrack(id);
    if (!track) {
      throw new HttpException(
        'Unprocessable Entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.getFavoritesIds();
    favorites.pushTrack(id);
    await this.favoritesRepository.save(favorites);
    return track;
  }

  public async deleteTrackFromFav(id: string) {
    const trackId = (await this.getFavoritesIds()).tracks.find(
      (tid) => tid === id,
    );
    if (!trackId) {
      throw new NotFoundException(`Track is not favorite`);
    }
    const favorites = await this.getFavoritesIds();
    favorites.removeTrack(id);
    await this.favoritesRepository.save(favorites);
  }

  public async addArtistToFav(id: string) {
    const artist = await this.artistsService.getOneArtist(id);
    if (!artist) {
      throw new HttpException(
        'Unprocessable Entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.getFavoritesIds();
    favorites.pushArtist(id);
    await this.favoritesRepository.save(favorites);
    return artist;
  }

  public async deleteArtistFromFav(id: string) {
    const artistId = (await this.getFavoritesIds()).artists.find(
      (aid) => aid === id,
    );
    if (!artistId) {
      throw new NotFoundException(`Artist is not favorite`);
    }
    const favorites = await this.getFavoritesIds();
    favorites.removeArist(id);
    await this.favoritesRepository.save(favorites);
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

  private async getFavoritesIds() {
    const favs = await this.favoritesRepository.findOne({
      where: { userId: this.userId },
    });
    if (!favs) {
      return this.createFavoritesCollection(this.userId);
    }
    return favs;
  }

  private async createFavoritesCollection(userId: string) {
    const favoriteEntity = this.favoritesRepository.create({
      userId,
    });
    return this.favoritesRepository.save(favoriteEntity);
  }
}
