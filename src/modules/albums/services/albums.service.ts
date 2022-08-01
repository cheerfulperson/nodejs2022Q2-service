import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumDto } from '../models/album.model';

@Injectable()
export class AlbumsService {
  private albumToDeleteSubject = new Subject<string>();

  public deletedId = this.albumToDeleteSubject.asObservable();

  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository = new Repository<AlbumEntity>(),
  ) {}

  public async getAllAlbums() {
    return this.albumsRepository.find();
  }

  public async addOneAlbum(albumInfo: CreateAlbumDto) {
    const album = {
      id: v4(),
      ...albumInfo,
    };
    const albumEntity = this.albumsRepository.create(album);
    return await this.albumsRepository.save(albumEntity);
  }

  public getOneAlbum(id: string) {
    return this.albumsRepository.findOne({ where: { id } });
  }

  public async updateOneAlbum(id: string, body: UpdateAlbumDto) {
    const album = await this.getOneAlbum(id);

    album.id = id;
    album.name = body.name;
    album.artistId = body.artistId ?? null;
    album.year = body.year;
    return this.albumsRepository.save(album);
  }

  public async deleteOneAlbum(id: string) {
    this.albumToDeleteSubject.next(id);
    await this.albumsRepository.delete(id);
  }

  public async deleteArtistId(artistId: string) {
    const album = await this.albumsRepository.findOne({ where: { artistId } });
    if (album) {
      album.artistId = null;
      this.albumsRepository.save(album);
    }
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
