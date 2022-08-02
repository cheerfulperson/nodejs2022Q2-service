import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public year: number;

  @Column({ default: null })
  public artistId: string | null;
}
