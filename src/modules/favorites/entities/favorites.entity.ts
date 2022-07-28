import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('favorites')
export class FavoriteEntity {
  @Column('uuid')
  @PrimaryColumn()
  public userId: string;

  @Column('character varying', { default: '' })
  private _artists: string;

  @Column('character varying', { default: '' })
  private _albums: string;

  @Column('character varying', { default: '' })
  private _tracks: string;

  public get artists(): string[] {
    return this._artists.split(',').filter((id) => Boolean(id));
  }

  public pushArtist(artistId: string) {
    this._artists += `,${artistId}`;
  }

  public removeArist(id: string) {
    const artistIndex = this.artists.findIndex((aId) => aId === id);
    this._artists = this._artists
      .split(',')
      .splice(artistIndex - 1, 1)
      .join(',');
  }

  public get albums(): string[] {
    return this._albums.split(',').filter((id) => Boolean(id));
  }

  public pushAlbum(id: string) {
    this._albums += `,${id}`;
  }

  public removeAlbum(id: string) {
    const albumIndex = this.albums.findIndex((aId) => aId === id);
    this._albums = this._albums
      .split(',')
      .splice(albumIndex - 1, 1)
      .join(',');
  }

  public get tracks(): string[] {
    return this._tracks.split(',').filter((id) => Boolean(id));
  }

  public pushTrack(id: string) {
    this._tracks += `,${id}`;
  }

  public removeTrack(id: string) {
    const trackIndex = this.tracks.findIndex((aId) => aId === id);
    this._tracks = this._tracks
      .split(',')
      .splice(trackIndex - 1, 1)
      .join(',');
  }
}
