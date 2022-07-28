import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Artist, ArtistDto } from '../models/artists.models';
import { v4 } from 'uuid';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { FavoritesService } from 'src/modules/favorites/services/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '../entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository = new Repository<ArtistEntity>(),
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favService: FavoritesService,
  ) {}

  public async getAllArtists(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  public async addOneArtist(newArtist: ArtistDto) {
    const artist = {
      id: v4(),
      ...newArtist,
    };
    const artistEntity = this.artistsRepository.create(artist);
    return this.artistsRepository.save(artistEntity);
  }

  public async getOneArtist(id: string) {
    return this.artistsRepository.findOne({ where: { id } });
  }

  public async updateArtist(id: string, body: ArtistDto) {
    const artist = await this.getOneArtist(id);
    artist.id = id;
    artist.name = body.name;
    artist.grammy = body.grammy;

    return this.artistsRepository.save(artist);
  }

  public async deleteOneArtist(id: string) {
    await this.artistsRepository.delete(id);
    try {
      await this.tracksService.updateTrackEntity({ artistId: id });
      await this.favService.deleteArtistFromFav(id);
    } catch (error) {}
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
