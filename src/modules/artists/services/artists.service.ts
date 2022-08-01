import { Injectable } from '@nestjs/common';
import { Artist, ArtistDto } from '../models/artists.models';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '../entities/artist.entity';
import { Repository } from 'typeorm';
import { Subject } from 'rxjs';

@Injectable()
export class ArtistsService {
  private toDeleteSubject = new Subject<string>();

  public deletedId = this.toDeleteSubject.asObservable();

  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository = new Repository<ArtistEntity>(),
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
    this.toDeleteSubject.next(id);
    await this.artistsRepository.delete(id);
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
