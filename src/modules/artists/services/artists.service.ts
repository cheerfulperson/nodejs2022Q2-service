import { Injectable } from '@nestjs/common';
import { Artist } from '../models/artists.models';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '../entities/artist.entity';
import { Repository } from 'typeorm';
import { Subject } from 'rxjs';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

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

  public async addOneArtist(newArtist: CreateArtistDto) {
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

  public async updateArtist(id: string, body: UpdateArtistDto) {
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
}
